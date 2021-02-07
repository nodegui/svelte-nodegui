<script lang="ts">
    import { onMount } from 'svelte';
    import open from "open";
    let win;
    onMount(() => {
        // Prevent garbage collection.
        (window as any).win = win; 
        win.nativeView.show();

        return () => {
            delete (window as any).win;
        };
    });

    const openDocs = () => {
        open('https://google.com');
    }
</script>

<svelte:options namespace="foreign" />
<window bind:this={win} windowTitle="Hello World">
    <view id="container" style="background-color: '#41444A';">
        <text style="color: white;">Welcome to Svelte NodeGUI! 😎️</text>
        <text>1. </text>
        <button on:clicked={openDocs} id="nice_button" text="Press me"/>
    </view>
</window>

<style>
    #container {
        align-items: 'center';
        justify-content: 'space-around';
        padding: 8;
    }
    #nice_button {
        font-weight: 900;
    }
</style>
