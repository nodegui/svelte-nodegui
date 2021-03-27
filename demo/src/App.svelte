<script lang="ts">
    import { onMount } from 'svelte';
    import type { NSVElement, RNWindow } from "@nodegui/svelte-nodegui";
    let win;
    onMount(() => {
        (window as any).win = win; // Prevent garbage collection.
        (win as NSVElement<RNWindow>).nativeView.show();
        return () => {
            delete (window as any).win;
        };
    });
</script>

<window bind:this={win} windowTitle="Hello World">
    <view id="container" style="background-color: '#41444A';">
        <text style="color: white;">Some text with actual children</text>
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
