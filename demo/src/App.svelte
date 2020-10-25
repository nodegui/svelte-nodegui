<script>
    import { onMount } from 'svelte'

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

<window
    bind:this={win}
    windowTitle="Hello World"
>
    <view nodeRole="centralWidget" id="myroot" style={`background-color: #00FF00;`}>
        <text id="mylabel" text={`The time is: ${currentDate.toLocaleTimeString()}`}></text>
        <button style="margin: 8px; height: 30px;" text="Press me"></button>
        <text style="color: red;" text="Some red text"></text>
    </view>
</window>
