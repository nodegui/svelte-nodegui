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
        <scrollArea id="scroll">
            <text style="background-color: lime;">Some text with actual children. 
                This text is a bit long so that we can test if scrollArea works correctly :-).
            </text>
        </scrollArea>
        <button on:clicked={(checked) => console.log("Clicked!", checked)} id="nice_button" text="Press me"/>
    </view>
</window>

<style>
    #container {
        flex-direction: column;
    }
    #nice_button {
        font-weight: 900;
    }
    #scroll{
        width: "100%";
        flex: 1;
    }
</style>
