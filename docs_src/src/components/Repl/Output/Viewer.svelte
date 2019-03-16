<script>
	import { onMount, createEventDispatcher, getContext } from 'svelte';
	import { PreviewService } from './previewService'
	import Message from '../Message.svelte';

	const dispatch = createEventDispatcher();
	const { bundle, navigate } = getContext('REPL');

	export let error; // TODO should this be exposed as a prop?

	let inited = false;
	let current_token;

	let p;
	let qrcode_holder;
	let qrUrl;

	async function apply_bundle($bundle) {
		if (!$bundle || $bundle.error) return;
		console.log("apply bundle", $bundle);
		if (!process.browser) return
		if (!p) {
			p = new PreviewService();
		}
		await p.init();

		qrUrl = p.qrCodeUrl();
		new QRCode(qrcode_holder, {
			text: qrUrl,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.L
		});

		inited = true;
	}

	$: apply_bundle($bundle);


</script>

<style>
	.overlay {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>

<div>
	<div class="overlay">
		{#if error}
			<Message kind="error" details={error}/>
		{:else if !$bundle}
			<Message kind="info">loading Svelte compiler...</Message>
		{/if}
	</div>
	<div bind:this={qrcode_holder}></div>
	<pre>
		{$bundle ? ($bundle.dom ? $bundle.dom.code : "no dom"  ) : ""}
	</pre>
</div>