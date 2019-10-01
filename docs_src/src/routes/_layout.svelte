<script>
	
	import { stores } from '@sapper/app';
	import InlineSvg from '../components/InlineSvg.svelte';
	import Nav from '../components/TopNav.svelte';

	export let segment;

	const { page, preloading, session } = stores();
</script>

<InlineSvg />
{#if $page.path !== '/repl/embed'}
	<Nav {segment}/>
{/if}

<main>
	<slot></slot>
</main>
<!--
	Website design thanks to the Svelte project. 
-->
<style>
	main {
		position: relative;
		margin: 0 auto;
		padding: var(--nav-h) var(--side-nav) 0 var(--side-nav);
		overflow-x: hidden;
	}
</style>