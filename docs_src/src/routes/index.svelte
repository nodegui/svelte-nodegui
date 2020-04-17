<script>
	import { Blurb, Hero } from '@sveltejs/site-kit';
	import Example from '../components/Example.svelte'
</script>

<style>
	:global(.hero .logotype) {
		height: 6rem !important;
	}

	.examples {
		background: var(--second);
		color: white;
		overflow: hidden;
	}

	.examples h2 {
		color: white;
		margin-bottom: 30px;
	}

	.examples a {
		color: white;
	}
	.examples .github-link {
		display: inline-block;
		text-align: right;
		background-color: var(--prime);
		padding: 0.2em 0.5em;
		border-radius: var(--border-r);
		color: white;
		position: relative;
		border-bottom: none;
		margin-bottom: 1em;
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
		<h2>Powered by Svelte</h2>
		<p>Svelte Native is a mobile application framework powered by Svelte — build mobile apps using the friendly web framework you alredy know</p>
		<span class="learn-more">learn more</span>
	</a>

	<a href="https://www.nativescript.org/about" slot="two">
		<h2>Using NativeScript</h2>
		<p>Build cross-platform, native iOS and Android apps without web views. Get truly native UI and performance while sharing skills and code with the web</p>
		<span class="learn-more">learn more</span>
	</a>

	<a href="tutorial" slot="three">
		<h2>Fully featured</h2>
		<p>Use the full power of Svelte including Transitions, Stores, and Reactivity. One of the smoothest development experiences available for mobile</p>
		<span class="learn-more">learn more</span>
	</a>

	<div class="description" slot="what">
		<p>Svelte Native is a new approach to building mobile applications using NativeScript. Where other JavaScript
			mobile development frameworks like React Native and NativeScript-Vue do the bulk of their work on
			the <em>mobile device</em>, Svelte Native shifts that work into a <em>compile step</em> that happens
			when you build your app.</p>

		<p>Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the native
			view widgets when the state of your app changes.</p>
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
<div class="examples">
	

	<Example imageUrl="https://raw.githubusercontent.com/halfnelson/svelte-native-grocery/master/nativescript-svelte-grocery.gif">
		<h2>Svelte Native Grocery</h2>
		<p>
			Grocery app example. Manage and sync grocery items.
		
		</p>
			<a href="https://github.com/halfnelson/svelte-native-grocery" class="github-link">Repository</a>
	</Example>

	<Example imageUrl="https://raw.githubusercontent.com/halfnelson/svelte-native-realworld/master/nativescript-svelte-realworld.gif">
		<h2>Svelte Native Realworld</h2>
		<p>
		A <a href="https://github.com/gothinkster/realworld">Realworld</a> implementation app in Svelte Native.
		
		</p>
			<a href="https://github.com/halfnelson/svelte-native-realworld" class="github-link">Repository</a>
	</Example>

	<Example imageUrl="https://raw.githubusercontent.com/halfnelson/svelte-native-hackernews/master/nativescript-svelte-hn.gif">
		<h2>Svelte Native Hacker News Reader</h2>
		<p>
			Simple HackerNews client in Svelte Native.
			
		</p>
		<a href="https://github.com/halfnelson/svelte-native-hackernews"class="github-link">Repository</a>
	</Example>


</div>


