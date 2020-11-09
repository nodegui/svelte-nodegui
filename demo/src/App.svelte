<script lang="ts">
    import { onMount } from 'svelte';
    let win;
    onMount(() => {
        (window as any).win = win; // Prevent garbage collection.
        win.nativeView.show();
        return () => {
            delete (window as any).win;
        };
    });
</script>

<window bind:this={win} windowTitle="Hello World">
    <view id="container" style="background-color: 'cyan';">
        <text>Some text with actual children</text>
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
