<script lang="ts">
    import { onMount } from 'svelte';
    import ChooseRoot from './pages/choose-root.svelte';
    const windowSize = { height: 480, width: 640 };
    let win;
    onMount(() => {
        // Prevent garbage collection.
        (window as any).win = win; 
        win.nativeView.show();

        return () => {
            delete (window as any).win;
        };
    });
</script>

<svelte:options namespace="foreign" />
<window bind:this={win} minSize={windowSize} windowTitle="FileShare">
    <view id="container">
        <ChooseRoot />
    </view>
</window>

<style>
    #container {
        background-color: '#41444A';
        justify-content: 'center';
        height: '100%';
    }
</style>
