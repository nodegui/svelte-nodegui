<script>
	import { onMount, createEventDispatcher, getContext, tick } from 'svelte';
	import { PreviewService } from './previewService'
	import Message from '../Message.svelte';
	import SplitPane from '../SplitPane.svelte';
	import Icon from '../../Icon.svelte';
	//	const dispatch = createEventDispatcher();
	const { bundle, navigate } = getContext('REPL');

	export let error; // TODO should this be exposed as a prop?

	let inited = false;
	let previewService = new PreviewService();

	const dispatch = createEventDispatcher();
	let syncInProgress = previewService.syncInProgress;
	$: dispatch('syncstatechange', { state: $syncInProgress });

	let qrcode_holder;
	let connected_devices = previewService.connectedDevices;
	let last_log = previewService.lastLogMessage;
	let log_div;
	let log_messages = [
		"[Galaxy Tab S2]  Log message 1",
		"[Galaxy Tab S2]  Log message 1",
		"[Galaxy Tab S2]  Log message 1",
		"[Galaxy Tab S2]  Log message 1",
		"[Galaxy Tab S2]  Log message 1"

	];
	let log_follow = true;
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
		console.log("init with ", $bundle.dom.code);
		await previewService.init($bundle.dom.code);

		let qrUrl = previewService.qrCodeUrl();
		qrcode_holder.innerHTML = '';
		new QRCode(qrcode_holder, {
			text: qrUrl,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.L
		});
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

	$: if ($last_log) {
		log_messages = log_messages.concat(`[${$last_log.deviceName}] ${$last_log.log}`).slice(Math.max(log_messages.length - 100, 0));
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

	.view-toggle {
		height: var(--pane-controls-h);
		border-bottom: 1px solid #eee;
		white-space: nowrap;
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

	.tab-content {
		position: absolute;
		width: 100%;
		height: calc(100% - 4.2rem);
		opacity: 0;
		pointer-events: none;
		overflow: auto;
	}

	.tab-content.visible {
		/* can't use visibility due to a weird painting bug in Chrome */
		opacity: 1;
		pointer-events: all;
	}

	.no-devices {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.connected-devices {
		width: 100%;
		height: 100%;
		font-size: 1.5rem;
	}

	.device .device-name {
		margin-left: 2rem;
	}

	.connected-devices .device {
		padding: 0.5rem 1rem;
		border-bottom: 1px solid #DDD;
	}

	#logtab {
		height: calc(100% - 4.5rem);
	}

	.log {
		font-family: monospace;
		font-size: 1.2rem;
		display: block;
		line-height: 1.5;
	}
</style>


<div class="overlay">
	{#if error}
		<Message kind="error" details={error}/>
	{:else if !$bundle}
			<Message kind="info">loading Svelte compiler...</Message>
	{/if}
</div>
	<SplitPane type="vertical" pos={67}>
		<div slot="a" class="preview-info">
	
			<div class="qr-code" bind:this={qrcode_holder}>
				&nbsp;
			</div>
		</div>
		<section slot="b">
			<div class="view-toggle">
				<button class:active="{view === 'devices'}" on:click="{() => view = 'devices'}">Devices</button>
				<button class:active="{view === 'log'}" on:click="{() => view = 'log'}">Log</button>
			</div>
			
			<div class="tab-content" class:visible="{view === 'devices'}">
				<div class="connected-devices">
					{#each $connected_devices as device}
						<div class="device"><Icon name="check"/><span class="device-name">{device.name}</span></div>
					{:else}
						<div class="no-devices">No connected devices. Scan the QR code to connect a device.</div>
					{/each}
				</div>
			</div>

				<div class="tab-content" id="logtab" class:visible="{view === 'log'}" bind:this={log_div} on:scroll={logScroll}>
					{#each log_messages as log_message}
						<span class="log">{log_message}</span>
					{/each}
				</div>
			
		</section>
	</SplitPane>