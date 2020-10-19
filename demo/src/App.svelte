<window bind:this={win}>
    <!-- <text>Examples</text> -->
</window>

<script>
    import { onMount } from 'svelte'

    let win;

    onMount(() => {
        console.log(`Mounted! win:`, win);
        console.log(`Mounted! win.nativeView:`, win.nativeView);
        /**
         * @see https://github.com/nodegui/nodegui-starter/blob/master/src/index.ts#L44
         */
        win.nativeView.setWindowTitle("Hello World");
        win.nativeView.show();
    })
</script>

<style>
    .current {
        font-weight: bold;
    }
</style>
