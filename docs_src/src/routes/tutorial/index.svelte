<script context="module">
	export async function preload() {
		const sections = await this.fetch(`tutorial.json`).then(r => r.json()).catch(e => console.log(e));
		return { sections };
	}
</script>

<script>
	import { Docs } from '@sveltejs/site-kit';
	import { onMount } from 'svelte'
	export let sections;
	let docs_container;
	// site-kit hard codes the links to "docs", so we try and fix them up here after mount
	onMount(() => {
		let links = [
			...docs_container.querySelectorAll('section a.anchor'),
			...docs_container.querySelectorAll('.sidebar a') 
			]
		links.forEach(el => {
			if (el.href.indexOf('docs#') > -1) {
				el.href = el.href.replace(/^docs#/, 'tutorial#');
				el.href = el.href.replace(/\/docs#/, '/tutorial#');
			}
		})
	})
</script>

<svelte:head>
	<title>Tutorial • Svelte Native</title>
</svelte:head>

<div bind:this={docs_container} >
<Docs {sections}
	project="svelte-native"
	owner="halfnelson"
	dir="tutorial"
	path="docs_src/content"
/>
</div>