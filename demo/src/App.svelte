<script>
    import { onMount } from 'svelte';

    let win;
    let date = new Date();

    onMount(() => {
        window.win = win;
        win.nativeView.show();
        const timer = setInterval(() => date = new Date(), 1000);

        return () => {
            clearInterval(timer);
            delete window.win;
        };
    })

    function onClicked(e){
        console.log("Clicked!", e);
    }
</script>

<window bind:this={win} windowTitle="Hello World">
    <view id="container" style="background-color: 'cyan';">
        <text children="The time is: {date.toLocaleTimeString()}"></text>
        <button on:clicked={onClicked} id="nice_button" text="Press me"></button>
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
