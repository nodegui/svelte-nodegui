<script>
	import { page } from '@sapper/app';
	import InlineSvg from '../components/InlineSvg.svelte';
	import Nav from '../components/TopNav.svelte';

	export let segment;
	export let path;
</script>

<InlineSvg />
{#if $page.path !== '/repl/embed'}
	<Nav {segment}/>
{/if}

<main>
	<slot></slot>
</main>
<footer class="design-attribution">
	Website design thanks to the Svelte project. 
</footer>
<style>
	main {
		position: relative;
		margin: 0 auto;
		padding: var(--nav-h) var(--side-nav) 0 var(--side-nav);
		overflow-x: hidden;
	}
	.design-attribution {
		color: #aaaaaa;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
	}
</style>