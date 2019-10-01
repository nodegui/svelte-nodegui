<script>
	import { Blurb, Hero, Section } from '@sveltejs/site-kit';
	import Icon from '../components/Icon.svelte';
	import Logo from '../components/Logo.svelte';

	let sy = 0;
</script>

<style>
	
	/* darken text for accesibility */
	:global(.back-light) {
		--text: hsl(36, 3%, 44%);
	}


</style>

<svelte:head>
	<title>Svelte Native • The Svelte Mobile Development Experience</title>
</svelte:head>

<svelte:window bind:scrollY={sy} />

<Hero
	title="Svelte Native"
	tagline="The Svelte Mobile Development Experience"
	outline="logo.svg"
	logotype="svelte-logotype.svg"
/>

<Blurb>
	<a href="/tutorial" slot="one">
		<h2>Write less code</h2>
		<p>Build boilerplate-free mobile applications using languages you already know — HTML, CSS and JavaScript</p>
		<span class="learn-more">learn more</span>
	</a>



	<a href="https://svelte.dev/blog/virtual-dom-is-pure-overhead" slot="two">
		<h2>No virtual DOM</h2>
		<p>Build boilerplate-free mobile applications using languages you already know — HTML, CSS and JavaScript</p>
		<span class="learn-more">learn more</span>
	</a>


	<a href="https://svelte.dev/blog/svelte-3-rethinking-reactivity" slot="three">
		<h2>Truly reactive</h2>
		<p>No more complex state management libraries — Svelte brings reactivity to JavaScript itself</p>

		<span class="learn-more">learn more</span>
	</a>

	<div class="description" slot="what">
		<p>Svelte Native is a new approach to building mobile applications using NativeScript. Where other JS-Native
			frameworks like React-Native and
			Nativescript-Vue do the bulk of their work on the <em>mobile device</em>, Svelte Native shifts that work
			into a <em>compile step</em>
			that happens when you build your app.</p>

		<p>Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the native
			view widgets when
			the state of your app changes.</p>
	</div>

	<div style="grid-area: start; display: flex; flex-direction: column; min-width: 0" slot="how">
		<pre class="language-bash" style="margin: 0 0 1em 0; min-width: 0; min-height: 0">
npm install -g nativescript
npx degit halfnelson/svelte-native-template my-mobile-app
cd my-mobile-app

npm install
tns run android
		</pre>

		<p style="flex: 1">See the <a href="blog/svelte-native-quick-start">quickstart guide</a> for more information.</p>

		<p class="cta"><a rel="prefetch" href="tutorial">Learn Svelte Native</a></p>
	</div>
</Blurb>


