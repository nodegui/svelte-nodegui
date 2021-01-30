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

<!--
    Known issue:
    The Svelte VS Code Extension gives an "invalid-namespace-property" error here.
    Will be solved by introducing the preprocessor, or once the VS Code Extension
    is updated to use Svelte 3.32.1.
-->
<svelte:options namespace="foreign" />
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
