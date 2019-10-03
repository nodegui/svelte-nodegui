<script context="module">
	export async function preload() {
		const sections = await this.fetch(`docs.json`).then(r => r.json()).catch(e => console.log(e));
		return { sections };
	}
</script>

<script>
	import { Docs } from '@sveltejs/site-kit';

	export let sections;
</script>

<svelte:head>
	<title>API Docs • Svelte Native</title>
</svelte:head>

<Docs {sections}
	project="svelte-native"
	owner="halfnelson"
	dir="docs"
	path="/docs_src/content"
/>

<style>
	:global(.content section div.nsref) {
		float: right;
		margin-top: -4.5rem;
	}

	:global(.content section div.nsref a) {
		font-size: 1.1rem;
		opacity: 0.7;
		border: none;
	}

	:global(.content section div.nsref a:hover) {
		font-size: 1.1rem;
		border: none;
	}

	:global(.content section div.nsref a::after) {
		content: ' 🡢';
	}
</style>