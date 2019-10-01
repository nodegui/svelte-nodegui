<script>
	
	import { stores } from '@sapper/app';
	import { Icon, Icons, Nav, NavItem } from '@sveltejs/site-kit';
	import PreloadingIndicator from '../components/PreloadingIndicator.svelte';

/*	import InlineSvg from '../components/InlineSvg.svelte';
	import Nav from '../components/TopNav.svelte'; */

	export let segment;

	const { page, preloading, session } = stores();
</script>

<Icons/>

{#if $preloading}
	<PreloadingIndicator/>
{/if}


{#if $page.path !== '/repl/embed'}
	<Nav {segment} {page} logo="logo.svg">
		<NavItem segment="tutorial">Tutorial</NavItem>
		<NavItem segment="docs">API</NavItem>
		<NavItem segment="repl">REPL</NavItem>
		<NavItem segment="blog">Blog</NavItem>
		
		<NavItem external="https://svelte.dev">Svelte</NavItem>
		<NavItem external="https://docs.nativescript.org/start/introduction">NativeScript</NavItem>

		<NavItem external="chat" title="Discord Chat">
			<Icon name="message-square"/>
		</NavItem>

		<NavItem external="https://github.com/halfnelson/svelte-native" title="GitHub Repo">
			<Icon name="github"/>
		</NavItem>
	</Nav>
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
		padding: var(--nav-h) 0 0 0;
		overflow-x: hidden;
	}
</style>