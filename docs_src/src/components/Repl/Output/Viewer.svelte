<script>
	import { onMount, createEventDispatcher, getContext, tick } from 'svelte';
	import { PreviewService } from './previewService'
	import Message from '../Message.svelte';
	import SplitPane from '../SplitPane.svelte';
	import QRCode from './QRCode.svelte';
	import Icon from '../../Icon.svelte';
	//	const dispatch = createEventDispatcher();
	const { bundle, navigate } = getContext('REPL');

	export let error; // TODO should this be exposed as a prop?

	let inited = false;
	let previewService = new PreviewService();

	const dispatch = createEventDispatcher();
	let syncInProgress = previewService.syncInProgress;
	$: dispatch('syncstatechange', { state: $syncInProgress });

	let qrCodeUrl;
	let connected_devices = previewService.connectedDevices;
	let log_div;
	let log_messages = ["[Preview] Waiting for Device..."];
	let log_follow = true;
	let show_qr = true;
	let view = "devices";

	export function launchPreview() {
		console.log("Launch Preview!!!!");
		if (!inited) return;
		if ($connected_devices && $connected_devices.length < 1) {
			alert("You must connect a device using the QR Code before you can Preview");
			return;
		}
		if ($bundle.dom.code) {
			previewService.syncApp($bundle.dom.code);
		}
	}

	async function init_preview_service() {
		inited = true;
		await previewService.init($bundle.dom.code, onLog);
		qrCodeUrl = previewService.qrCodeUrl();
	}

	function logScroll(e) {
		log_follow = (log_div.scrollHeight - (log_div.scrollTop + log_div.clientHeight)) < 10;
	}

	$: if (!inited && $bundle && !$bundle.error) init_preview_service();

	function updateLogScroll() {
		if (log_div) tick().then(() => log_div.scrollTop = log_div.scrollHeight);
	}

	$: if (log_messages && log_follow) {
		updateLogScroll();
	}

	function onLog(last_log) {
		log_messages = log_messages.concat(`[${last_log.deviceName || "Preview"}] ${last_log.log}`).slice(Math.max(log_messages.length - 100, 0));
	}
</script>

<style>
	.overlay {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.qr-code {
		width: 256px;
		height: 256px;
	}

	.preview-info {
		height: 100%;
		overflow-y: auto;
	}

	button {
		/* width: 50%;
		height: 100%; */
		text-align: left;
		position: relative;
		font: 400 1.2rem/1.5 var(--font);
		border-bottom: var(--border-w) solid transparent;
		padding: 1.2rem 1.2rem 0.8rem 1.2rem;
		color: #999;
	}

	button.active {
		border-bottom: var(--border-w) solid var(--prime);
		color: #333;
	}

	.connected-devices {
		width: 100%;
		font-size: 1.5rem;
	}

	.device .device-name {
		margin-left: 2rem;
	}

	.connected-devices .device {
		padding: 0.5rem 1rem;
	}

	#logtab {
		flex: 1;
		height: calc(100% - 4.5rem);
	}

	.pane {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
	}

	.pane>.section-content {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.log {
		font-family: monospace;
		font-size: 1.2rem;
		display: block;
		line-height: 1.5;
		padding: 0 1rem;
	}

	.preview-info-overlay {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 15;
	}

	.preview-info-window {
		position: absolute;
		top: 2rem;
		left: 2rem;
		right: 2rem;
		bottom: 2rem;
		padding: 1rem;
		background-color: white;
	}

	.preview-info-window .close-btn {
		position: absolute;
		right: -0.5rem;
		top: -0.5rem;
	}

	.preview-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
	}

	.preview-info .apps {
		margin: 3rem 3rem 0 3rem;
		text-align: center;
	}

	h3 {
		font-size: 1.2rem;
		font-weight: 700;
		padding: 1rem;
	}
</style>


<div class="overlay">
	{#if error}
		<Message kind="error" details={error}/>
	{:else if !$bundle}
			<Message kind="info">loading Svelte compiler...</Message>
	{/if}
</div>

	{#if show_qr}
	<div class="preview-info-overlay">
		<div class="preview-info-window">
			<button class="close-btn icon" title="Close" on:click="{() => show_qr = false}">
				<Icon name="close" /></button>
		<div class="preview-info">
			<QRCode url="{qrCodeUrl}"/>
			<div class="apps">
				<p>To get started, scan this QRcode with the NativeScript Playground App</p>
				<a href="https://itunes.apple.com/us/app/nativescript-playground/id1263543946?mt=8&ls=1"><img src="/media/app-store.png"
					alt="Get if rom the App Store"></a>
				<a href="https://play.google.com/store/apps/details?id=org.nativescript.play"><img src="/media/google-play.png" alt="Get it from Google Play"></a>
			</div>
		</div>
		</div>
	</div>

	{/if}


	<SplitPane type="vertical" pos={25}>
		<div slot="a" class="pane">
				<h3>Connected Devices</h3>
				<div class="section-content">
					<div class="connected-devices">
					{#each $connected_devices as device}
						<div class="device"><Icon name="check"/><span class="device-name">{device.name}</span></div>
					{/each}
					</div>
					<button class="icon" title="Add Device" on:click="{()=> show_qr = true}">
						<Icon name="plus"/>	Add Device
					</button>
				</div>
		</div>
		<section slot="b" class="pane">
				<h3>Logs</h3>
				<div  id="logtab" class="section-content" bind:this={log_div} on:scroll={logScroll}>
					{#each log_messages as log_message}
						<span class="log">{log_message}</span>
					{/each}
				</div>
		</section>
	</SplitPane>