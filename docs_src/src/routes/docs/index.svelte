<script context="module">
	export async function preload() {
		const sections = await this.fetch(`docs.json`).then(r => r.json()).catch(e => console.log(e));
		return { sections };
	}
</script>

<script>
	import GuidePage from '../../components/GuidePage.svelte'

	export let sections;
</script>

<svelte:head>
	<title>Learn Svelte Native</title>
</svelte:head>

<GuidePage edit_url="https://github.com/halfnelson/svelte-native/edit/master/docs_src/content/docs"
	sections="{sections}" />