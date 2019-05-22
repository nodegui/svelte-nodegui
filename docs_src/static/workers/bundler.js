self.window = self; // egregious hack to get magic-string to work in a worker

let version;

let fulfil;
let ready = new Promise(f => fulfil = f);

self.addEventListener('message', async event => {
	switch (event.data.type) {
		case 'init':
			version = event.data.version;

			importScripts(
				version === 'local' ?
					'/repl/local?file=compiler.js' :
					`https://unpkg.com/svelte@${version}/compiler.js`,
				`https://unpkg.com/rollup@0.68/dist/rollup.browser.js`,
				`https://bundle.run/svelte-native-preprocessor@0.1.4`
			);
			fulfil();

			break;

		case 'bundle':
			if (event.data.components.length === 0) return;

			await ready;
			const result = await bundle(event.data.components);
			if (result) {
				postMessage(result);
			}

			break;
	}
});

const commonCompilerOptions = {
	dev: true,
};

let cached = {
	dom: {},
	ssr: {}
};

let currentToken;

const is_svelte_module = id => id === 'svelte' || id.startsWith('svelte/');
const is_svelte_native_module = id => id === 'svelte-native' || id.startsWith('svelte-native/');

const cache = new Map();
function fetch_if_uncached(url) {
	if (!cache.has(url)) {
		cache.set(url, fetch(url.startsWith('https://unpkg.com/svelte@local/') ? '/repl/local?file=' + url.slice(31) : url)
			.then(r => r.text())
			.catch(err => {
				console.error(err);
				cache.delete(url);
			}));
	}

	return cache.get(url);
}

async function getBundle(mode, cache, lookup) {
	let bundle;
	let error;
	const all_warnings = [];

	const new_cache = {};

	try {
		bundle = await rollup.rollup({
			input: './app.js',
			external: id => {
				if (id[0] === '.') return false;
				if (is_svelte_module(id)) return false;
				if (is_svelte_native_module(id)) return false;
				if (id.startsWith('https://') || id.startsWith('/repl/svelte-native')) return false;
				return true;
			},
			plugins: [{
				resolveId(importee, importer) {
					// v3 hack
					if (importee === `svelte`) return `https://unpkg.com/svelte@${version}/index.mjs`;
					if (importee.startsWith(`svelte/`)) return `https://unpkg.com/svelte@${version}/${importee.slice(7)}.mjs`;

					if (importee === `svelte-native`) return 'https://unpkg.com/svelte-native@latest/index.mjs';
					//if (importee === `svelte-native`) return '/repl/svelte-native/index.mjs';
					if (importee.startsWith(`svelte-native/`)) return `https://unpkg.com/svelte-native@latest/${importee.slice(14)}/index.mjs`
					//if (importee.startsWith(`svelte-native/`)) return `/repl/svelte-native/${importee.slice(14)}/index.mjs`;


					if (importer && importer.startsWith(`https://unpkg.com/svelte-native`)) {
						return importer.replace('index.mjs', importee.slice(1)) + '/index.mjs'
					}


					if (importer && importer.startsWith(`https://`)) {
						return new URL(`${importee}.mjs`, importer).href;
					}

					if (importee.endsWith('.html')) importee = importee.replace(/\.html$/, '.svelte');

					if (importee in lookup) return importee;

					console.error("Unknown id", importee, importer)
				},
				load(id) {
					if (id.startsWith(`https://`) || id.startsWith('/repl/svelte-native')) return fetch_if_uncached(id);
					if (id in lookup) return lookup[id].source;
				},
				async transform(code, id) {
					if (!/\.svelte$/.test(id)) return null;

					const name = id.replace(/^\.\//, '').replace(/\.svelte$/, '');




					const result = cache[id] && cache[id].code === code
						? cache[id].result
						: await svelte.preprocess(code, svelteNativePreprocessor())
							.then(code =>
								svelte.compile(code.toString(), Object.assign({
									generate: mode,
									format: 'esm',
									name: name,
									filename: name + '.svelte'
								}, commonCompilerOptions))
							);

					new_cache[id] = { code, result };

					(result.warnings || result.stats.warnings).forEach(warning => { // TODO remove stats post-launch
						all_warnings.push({
							message: warning.message,
							filename: warning.filename,
							start: warning.start,
							end: warning.end
						});
					});

					return result.js;
				}
			}],
			onwarn(warning) {
				all_warnings.push({
					message: warning.message
				});
			}
		});
	} catch (error) {
		return { error, bundle: null, cache: new_cache, warnings: all_warnings }
	}

	return { bundle, cache: new_cache, error: null, warnings: all_warnings };
}

async function bundle(components) {
	// console.clear();
	console.log(`running Svelte compiler version %c${svelte.VERSION}`, 'font-weight: bold');

	const token = currentToken = {};

	const lookup = {};
	components.forEach(component => {
		const path = `./${component.name}.${component.type}`;
		lookup[path] = component;
	});


	// svelte native bootstrap
	lookup['./app.js'] = {
		name: 'app',
		type: 'js',
		source: `
import { navigate, svelteNative, initializeDom } from "svelte-native"
import App from "./App.svelte"

export function start() {
    svelteNative(App, {});
}

export function reload() {
	initializeDom();
    navigate({ page: App, clearHistory: true });
}
			`
	}


	const import_map = new Map();
	let dom;
	let error;

	try {
		dom = await getBundle('dom', cached.dom, lookup);
		if (dom.error) {
			throw dom.error;
		}

		if (token !== currentToken) {
			console.error(`aborted`);
			return;
		}

		cached.dom = dom.cache;

		let uid = 1;

		const dom_result = await dom.bundle.generate({
			format: 'cjs',
			name: 'App',
			globals: id => {
				const name = `import_${uid++}`;
				import_map.set(id, name);
				return name;
			},
			sourcemap: true
		});

		if (token !== currentToken) return;

		const ssr = false // TODO how can we do SSR?
			? await getBundle('ssr', cached.ssr, lookup)
			: null;

		if (ssr) {
			cached.ssr = ssr.cache;
			if (ssr.error) {
				throw ssr.error;
			}
		}

		if (token !== currentToken) return;

		const ssr_result = ssr
			? await ssr.bundle.generate({
				format: 'iife',
				name: 'SvelteComponent',
				globals: id => import_map.get(id),
				sourcemap: true
			})
			: null;

		return {
			imports: dom.bundle.imports,
			import_map,
			dom: dom_result,
			ssr: ssr_result,
			warnings: dom.warnings,
			error: null
		};
	} catch (err) {
		const e = error || err;
		delete e.toString;

		return {
			imports: [],
			import_map,
			dom: null,
			ssr: null,
			warnings: dom.warnings,
			error: Object.assign({}, e, {
				message: e.message,
				stack: e.stack
			})
		};
	}
}
