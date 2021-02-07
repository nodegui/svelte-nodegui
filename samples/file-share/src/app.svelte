<script lang="ts">
    import { rootFolder } from './stores/root-folder';
    import { onMount } from 'svelte';
    import open from "open";
    import ChooseRoot from './pages/choose-root.svelte';
    let win;
    onMount(() => {
        // Prevent garbage collection.
        (window as any).win = win; 
        win.nativeView.setMinimumSize(720, 640);
        win.nativeView.show();

        return () => {
            delete (window as any).win;
        };
    });
</script>

<svelte:options namespace="foreign" />
<window bind:this={win} windowTitle="FileShare">
    <view id="container">
    <!-- {#if $rootFolder === null} -->
        <ChooseRoot />
    <!-- {:else} -->
        <!-- <text>{$rootFolder}</text> -->
    <!-- {/if} -->
    </view>
</window>

<style>
    #container {
        background-color: '#41444A';
        align-items: 'center';
        justify-content: 'center';
        height: '100%';
    }
</style>
