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
            // window.document.setStyleSheets(`#dateText{color:'purple'}`);
        }, 1000);
        setTimeout(() => {
            window.document.setStyleSheets(`QPushButton{color:'purple'}`);
            // console.log(window.document.getElementById(`dateText`));
        }, 100);

        return () => {
            clearInterval(timer);
            delete window.win;
        };
    })
</script>

<window id="theWindow" bind:this={win} windowTitle="Hello World">
    <view
        style="align-items: 'center'; justify-content: space-between; background-color: #00FF00; width: 100%; height: 100%;"
    >
        <text
            id="dateText"
            style="flex: 1; width: '100%'; background-color: #0000FF; text-align: 'center';"
            text={`The time is: ${currentDate.toLocaleTimeString()}`}
        ></text>
        <button style="margin: 8px; height: 30px;" text="Press me"></button>
        <text
            id="colouredText"
            style="flex: 1; width: '100%'; background-color: #0000FF; text-align: 'center';"
            text="Some coloured text"
        >
        </text>
    </view>
</window>

<style>
    /* Problem: Svelte optimises this out because it's not found in the HTML above.
     * Would need to preprocess it to replace QTWidget names with HTML tagnames. */
    QPushButton {
        color: 'purple';
    }

    #colouredText {
        color: 'gold';
    }
</style>