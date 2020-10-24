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
    <view nodeRole="centralWidget" id="myroot">
        <flexLayout nodeRole="layout">
            <text id="mylabel" text="Hello"></text>
            <!-- <text style="color: red;">World</text> -->
        </flexLayout>
    </view>
    <!-- <text>Examples</text> -->
</window>

<script>
    import { onMount } from 'svelte'

    let win;

    onMount(() => {
        // console.log(`Mounted! win:`, win);
        // console.log(`Mounted! win.nativeView:`, win.nativeView);
        /**
         * @see https://github.com/nodegui/nodegui-starter/blob/master/src/index.ts#L44
         */
        win.nativeView.show();
    })
</script>

<style>
    .current {
        font-weight: bold;
    }
</style>
