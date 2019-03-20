<div class="qrcode" bind:this={qrcode_holder}>
    Connecting...
</div>
<style>
    .qrcode {
        width: 256px;
        height: 256px;
        text-align: center;
    }
</style>
<script>
    import { onMount } from 'svelte'

    export let url;

    let qrcode_holder;

    $: if (url && qrcode_holder) {
        qrcode_holder.innerHTML = '';
        new QRCode(qrcode_holder, {
            text: url,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    }
</script>