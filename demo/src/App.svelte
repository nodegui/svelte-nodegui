<window bind:this={win}>
    <!-- <text>Examples</text> -->
</window>

<script>
    import { onMount } from 'svelte'

    let win;

    onMount(() => {
        console.log(`Mounted! win:`, win);
        console.log(`Mounted! win.nativeView:`, win.nativeView);
        win.nativeView.setWindowTitle("Hello World");
        win.nativeView.show();
    })
</script>

<style>
    .current {
        font-weight: bold;
    }
</style>
