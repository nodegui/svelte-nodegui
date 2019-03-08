import get_sections from '../../utils/_sections.js';

let json;

export function get(req, res) {
	if (!json || process.env.NODE_ENV !== 'production') {
		json = JSON.stringify(get_sections("content/tutorial"));
	}

	res.set({
		'Content-Type': 'application/json'
	});

	res.end(json);
}