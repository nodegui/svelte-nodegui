<script>
	import Icon from '../components/Icon.svelte';
	import Logo from '../components/Logo.svelte';

	let sy = 0;
</script>

<style>
	.container {
		position: relative;
		margin: 10rem auto;
		max-width: 120rem;
	}

	.container ul {
		list-style: none;
	}

	/* max line-length ~60 chars */
	li:not(.box)>p {
		max-width: var(--linemax)
	}

	/* darken text for accesibility */
	:global(.back-light) {
		--text: hsl(36, 3%, 44%);
	}

	.logo {
		position: absolute;
		left: -120px;
		top: -120px;
		width: 80vmin;
		height: 80vmin;
		opacity: 0.1;
		will-change: transform;
	}

	.hero h1 {
		text-align: center;
		margin: 2rem 0;
		font-size: 6rem;
		color: var(--heading);
		font-weight: 100;
		letter-spacing: .12em;
		text-transform: uppercase;
	}

	.hero h2 {
		text-align: center;
		display: block;
		position: relative;
		font-size: 3.2rem;
		text-align: center;
		width: 100%;
		text-transform: lowercase;
		font-weight: 300;
		opacity: 0.7;
	}

	.box {
		padding: 2em;
		display: flex;
		flex-direction: column;
	}

	.box>h2 {
		padding: 0;
		margin: 0 0 0.5em 0;
		font-size: var(--h2);
		color: white;
		text-align: left;
	}

	.box>p {
		font-size: var(--h5);
	}

	.box a {
		position: relative;
		text-align: right;
		margin-top: auto;
		padding: 0 1.2em 0 0;
		font-family: Roboto, sans-serif;
		font-size: 1.6rem;
	}

	.box a:hover {
		color: white;
		text-decoration: underline;
	}

	.box a::after,
	.cta::after {
		content: '';
		position: absolute;
		display: block;
		right: 0;
		top: 0.25em;
		width: 1em;
		height: 1em;
		background: url(/icons/arrow-right.svg);
	}

	.cta::after {
		right: 0.5em;
		top: 0.6em;
	}

	h6 {
		max-width: 25em;
		padding: 2.4rem;
	}

	.example {
		background: var(--second);
		color: white;
		padding: 0.8rem;
		border-radius: var(--border-r);
	}

	.example>div:first-child {
		padding: 0.8rem;
	}

	iframe {
		display: block;
		width: 100%;
		height: 420px;
		border: none;
		border-radius: var(--border-r);
	}

	a.cta {
		background-color: var(--prime);
		padding: 0.5em 1.8em 0.5em 1em;
		border-radius: var(--border-r);
		color: white;
		position: relative;
	}

	.contributor {
		width: 2.4em;
		height: 2.4em;
		border-radius: 50%;
		text-indent: -9999px;
		display: inline-block;
		background-size: 100% 100%;
		margin: 0 0.5em 0.5em 0;
		border: 1px solid var(--second);
	}

	@media (min-width: 920px) {
		.example {
			display: grid;
			grid-template-columns: 1fr 4fr;
			grid-gap: 0.5em;
			align-items: start;
		}
	}

	@media screen and (min-width: 870px) {
		.hero h1 {
			position: relative;
			top: -.8rem;
			font-size: 10rem;
			margin: 2rem 2rem 0 1rem;
		}
	}
</style>

<svelte:head>
	<title>Svelte Native • The Svelte Mobile Development Experience</title>
</svelte:head>

<svelte:window bind:scrollY={sy} />

<img alt="Svelte logo" class="logo" src="/logo.svg" style="transform: translate(0,{sy * 0.2}px)">

<section class="hero container">
	<h1>Svelte Native</h1>
	<h2>The Svelte Mobile Development Experience</h2>
</section>

<section class='container'>
	<ul class='grid stretch'>
		<li class='box bg-prime white'>
			<h2 style='padding:2.4rem 0 0 0'>Write less code</h2>
			<p>Build boilerplate-free mobile applications using languages you already know — HTML, CSS and JavaScript
			</p>


		</li>

		<li class='box bg-flash white'>
			<h2 style='padding:2.4rem 0 0 0'>No virtual DOM</h2>
			<p>Svelte compiles your code to tiny, framework-less vanilla JS — your app starts fast and stays fast</p>


		</li>

		<li class='box bg-second white'>
			<h2 style='padding:2.4rem 0 0 0'>Truly reactive</h2>
			<p>No more complex state management libraries — Svelte brings reactivity to JavaScript itself</p>


		</li>
	</ul>
</section>

<section class="container grid half">
	<div class="linkify">
		<p>Svelte Native is a new approach to building mobile applications using NativeScript. Where other JS-Native
			frameworks like React-Native and
			Nativescript-Vue do the bulk of their work on the <em>mobile device</em>, Svelte Native shifts that work
			into a <em>compile step</em>
			that happens when you build your app.</p>

		<p>Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the native
			view widgets when
			the state of your app changes.</p>

	</div>

	<div>
		<pre class="language-bash">
npm install -g nativescript
npx degit halfnelson/svelte-native-template my-mobile-app
cd my-mobile-app

npm install
tns run android --bundle
		</pre>

		<p class="linkify">See the <a href="/docs#quick-start">quickstart guide</a> for more
			information.</p>

		<p><a rel="prefetch" class="cta" href="/tutorial">Learn Svelte Native</a></p>
	</div>
</section>