<script>
    import { onMount } from 'svelte';

    let win;
    let currentDate = new Date();

    onMount(() => {
        /* `window` is an alias for `global`. We assign this to prevent garbage-collection of the main window. */
        window.win = win;
        win.nativeView.setWindowTitle("Hello World");
        win.nativeView.show();

        let timer = setInterval(() => {
            currentDate = new Date();
        }, 1000);

        return () => {
            clearInterval(timer);
            delete window.win;
        };
    })
</script>

<window bind:this={win} windowTitle="Hello World">
    <view id="container" style="background-color: 'cyan';">
        <text text="The time is: {currentDate.toLocaleTimeString()}"></text>
        <button id="nice_button" text="Press me"></button>
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