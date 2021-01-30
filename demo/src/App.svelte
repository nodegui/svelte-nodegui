<script lang="ts">
    import { onMount } from 'svelte';
    import type { RNWindow } from "svelte-desktop/dom/react-nodegui/src/components/Window/RNWindow";

    export let who: string = "uninitialised";
    // let win: svelteDesktop.JSX.IntrinsicElements["window"];
    let win;
    onMount(() => {
        (window as any).win = win; // Prevent garbage collection.
        (win.nativeView as RNWindow).show();
        return () => {
            (win.nativeView as RNWindow).hide();
            delete (window as any).win;
        };
    });
</script>

<window bind:this={win} windowTitle="Hello World">
    <view id="container" style="background-color: 'cyan';">
        <text>Hello {who}</text>
        <button on:clicked={(checked) => console.log("Clicked!", checked)} id="nice_button" text="Press me"/>
    </view>
</window>

<style>
    #container {
        align-items: 'center';
        justify-content: 'space-around';
    }
    #nice_button {
        font-weight: 900;
    }
</style>
