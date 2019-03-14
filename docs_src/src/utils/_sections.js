import fs from 'fs';
import path from 'path';
import * as fleece from 'golden-fleece';
import process_markdown from './_process_markdown.js';
import marked from 'marked';

import PrismJS from 'prismjs';
import 'prismjs/components/prism-bash';

// map lang to prism-language-attr
const prismLang = {
	bash: 'bash',
	html: 'markup',
	js: 'javascript',
	css: 'css',
};

const escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
};

const unescaped = Object.keys(escaped).reduce(
	(unescaped, key) => ((unescaped[escaped[key]] = key), unescaped),
	{}
);

function unescape(str) {
	return String(str).replace(/&.+?;/g, match => unescaped[match] || match);
}

function extractMeta(line, lang) {
	try {
		if (lang === 'html' && line.startsWith('<!--') && line.endsWith('-->')) {
			return fleece.evaluate(line.slice(4, -3).trim());
		}

		if (
			lang === 'js' ||
			(lang === 'json' && line.startsWith('/*') && line.endsWith('*/'))
		) {
			return fleece.evaluate(line.slice(2, -2).trim());
		}
	} catch (err) {
		// TODO report these errors, don't just squelch them
		return null;
	}
}

export default function (docs_path, anchor_base_url) {
	return fs
		.readdirSync(docs_path)
		.filter(file => file[0] !== '.' && path.extname(file) === '.md')
		.map(file => {
			const markdown = fs.readFileSync(`${docs_path}/${file}`, 'utf-8');

			const { content, metadata } = process_markdown(markdown);

			const subsections = [];
			const renderer = new marked.Renderer();

			renderer.code = (source, lang) => {
				source = source.replace(/^ +/gm, match =>
					match.split('    ').join('\t')
				);

				const lines = source.split('\n');
				const meta = extractMeta(lines[0], lang);

				let prefix = '';
				let className = 'code-block';

				if (meta) {
					source = lines.slice(1).join('\n');
					const filename = meta.filename;
					if (filename) {
						prefix = `<span class='filename'>${prefix} ${filename}</span>`;
						className += ' named';
					}
					if (meta.hidden) return '';
				}

				const plang = prismLang[lang];
				const highlighted = PrismJS.highlight(
					source,
					PrismJS.languages[plang],
					lang
				);

				return `<div class='${className}'>${prefix}<pre class='language-${plang}'><code>${highlighted}</code></pre></div>`;
			};

			const seen = new Set();

			renderer.heading = (text, level, rawtext) => {
				if (level <= 3) {
					const slug = rawtext
						.toLowerCase()
						.replace(/[^a-zA-Z0-9]+/g, '-')
						.replace(/^-/, '')
						.replace(/-$/, '');

					if (seen.has(slug)) throw new Error(`Duplicate slug ${slug}`);
					seen.add(slug);

					if (level === 3) {
						const title = unescape(
							text
								.replace(/<\/?code>/g, '')
								.replace(/\.(\w+)(\((.+)?\))?/, (m, $1, $2, $3) => {
									if ($3) return `.${$1}(...)`;
									if ($2) return `.${$1}()`;
									return `.${$1}`;
								})
						);

						subsections.push({ slug, title });
					}

					return `
						<h${level}>
							<span id="${slug}" class="offset-anchor"></span>
							<a href="${anchor_base_url}#${slug}" class="anchor" aria-hidden="true"></a>
							${text}
						</h${level}>`;
				}

				return `<h${level}>${text}</h${level}>`;
			};

			const html = marked(content, { renderer });

			return {
				html,
				metadata,
				subsections,
				slug: file.replace(/^\d+-/, '').replace(/\.md$/, ''),
				file,
			};
		});
}
