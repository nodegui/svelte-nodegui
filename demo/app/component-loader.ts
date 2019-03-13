import { compile } from 'svelte/compiler'
import * as rollup from 'rollup/dist/rollup.browser.js'

async function bundle(lookup) {
    let bundle
    try {
        bundle = await rollup.rollup({
            input: './App.svelte',
            external: (id: string) => {
                if (id[0] === '.') return false;
                if (id.endsWith('.svelte')) return false;
                if (id.startsWith('svelte')) return true;
                return true;
            },
            plugins: [{
                resolveId(importee, importer) {
                    if (importee in lookup) return importee;
                },
                load(id) {
                    if (id in lookup) {
                        return lookup[id];
                    }
                },
                transform(code, id) {
                    if (!/\.svelte$/.test(id)) return null;
                    const name = id.replace(/^\.\//, '').replace(/\.svelte$/, '');
                    const result = compile(code, Object.assign({
                        generate: 'dom',
                        format: 'cjs',
                        name: name,
                        filename: name + '.svelte'
                    }, { dev: true }));

                    (result.warnings || result.stats.warnings).forEach(warning => { // TODO remove stats post-launch
                        console.log(`rollup WARN: ${warning.filename}:${warning.start}  ${warning.message}`)
                    });

                    return result.js;
                }
            }],
            onwarn(warning) {
                console.log(`rollup WARN: ${warning.message}`);
            }
        });
    } catch (error) {
        console.log(error);
        return { error, bundle: null }
    }
    return { bundle, error: null };
}


export async function componentFromString(src) {
    var bundle_result = await bundle({ "./App.svelte": src })
    if (!bundle_result.bundle) {
        throw new Error("Couldn't bundle component code:" + bundle_result.error.message);
    }
    let uid = 1;
    let bundle_iife = await bundle_result.bundle.generate({
        format: 'iife',
        name: 'SvelteComponent',
        globals: id => {
            const name = `import_${uid++}`;
            //import_map.set(id, name);
            return name;
        },
        sourcemap: true
    });
    return eval(`(function () { let exports = {}; ${bundle_iife.output[0].code}\n return exports })()`).default;
}
