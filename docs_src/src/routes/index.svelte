<script>
	import { Blurb, Hero } from '@sveltejs/site-kit';
</script>

<style>
	:global(.hero .logotype) {
		height: 6rem !important; 
	}

	@media (min-width: 640px) {
		:global(.hero .logotype) {
			height: 9rem !important;
		}
	}
</style>

<svelte:head>
	<title>Svelte Native • The Svelte Mobile Development Experience</title>
</svelte:head>


<Hero
	title="Svelte Native"
	tagline="The Svelte Mobile Development Experience"
	outline="svelte-native-logo-outline.svg"
	logotype="svelte-native-logotype.svg"
/>

<Blurb>
	<a href="https://svelte.dev" slot="one">
		<h2>Powered By Svelte</h2>
		<p>Svelte Native is an nativescript application framework powered by Svelte - Build mobile apps with Svelte components</p>
		<span class="learn-more">learn more</span>
	</a>

	<a href="https://www.nativescript.org/about" slot="two">
		<h2>Using NativeScript</h2>
		<p>Build full featured "Native" mobile applications using languages you already know — HTML, CSS and JavaScript</p>
		<span class="learn-more">learn more</span>
	</a>

	<a href="http://localhost:3000/tutorial" slot="three">
		<h2>Fully Featured</h2>
		<p>Use the full power of Svelte including Transitions, Stores, and Reactivity. One of the smoothest development experiences available for mobile</p>
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


