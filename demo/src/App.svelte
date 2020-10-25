<script>
    import { onMount } from 'svelte'

    let win;
    let currentDate = new Date();

    onMount(() => {
        let timer = setInterval(() => {
            currentDate = new Date();
        }, 1000);

        // console.log(`Mounted! win:`, win);
        // console.log(`Mounted! win.nativeView:`, win.nativeView);
        win.nativeView.setWindowTitle("Hello World");
        /**
         * @see https://github.com/nodegui/nodegui-starter/blob/master/src/index.ts#L44
         */
        win.nativeView.show();

        // `window` is an alias for `global`. We assign this to prevent garbage-collection of the main window.
        window.win = win;

        return () => {
            clearInterval(timer);
            delete window.win;
        };
    })
</script>

<window
    bind:this={win}
    windowTitle="Hello World"
    styleSheet={`
        #myroot {
            background-color: #009688;
            height: '100%';
            align-items: 'center';
            justify-content: 'center';
        }
        #mylabel {
            font-size: 16px;
            font-weight: bold;
            padding: 1;
        }
    `}
>
    <view nodeRole="centralWidget" id="myroot" style={`background-color: #00FF00; align-items: center; justify-content: center; height: 100%; width: 100%;`}>
    <!-- <view nodeRole="centralWidget" id="myroot" style="background-color: #00FF00; align-items: center; justify-content: center; height: 100%;"> -->
        <text id="mylabel" style="text-align: center;" text={`The time is: ${currentDate.toLocaleTimeString()}`}></text>
        <button style="margin: 8px; height: 30px;" text="Press me"></button>
        <!-- Style property not supported yet. -->
        <text style="color: red;" text="Some red text"></text>
        
        <!-- Native text nodes not supported yet. -->
        <!-- <text>World</text> -->
    </view>
</window>

<style>
    .current {
        font-weight: bold;
    }
</style>
