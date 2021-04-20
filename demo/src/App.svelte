<script lang="ts">
    import { onMount } from "svelte";
    import type { NSVElement, RNWindow } from "@nodegui/svelte-nodegui";
    import { Direction } from "@nodegui/nodegui";
    import fetch from "node-fetch";

    /**
     * The exact type for this is: NSVElement<RNWindow>
     * ... However, the Svelte language tools erroneously expect all bind:this values to extend HTMLElement, so
     * for now, we have to rely on reasserting the type.
     */
    let win;
    let urlWidget;
    let dataWidget;
    let jsonData="";

    async function loadPressed(){
        let dataPromise = await loadData(urlWidget.textContent);
        jsonData = JSON.stringify(dataPromise);
    }

    async function loadData(url){
        try{
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        }
        catch(error){
            console.error(error);
        }
    }

    onMount(() => {
        (window as any).win = win; // Prevent garbage collection, otherwise the window quickly disappears!
        (win as NSVElement<RNWindow>).nativeView.show();

        urlWidget.textContent = "https://reqres.in/api/products/3";

        return () => {
            delete (window as any).win;
        };
    });
</script>

<svelte:options namespace="foreign" />
<window
    bind:this={win}
    windowTitle="Seafile Share link DL">
    <view class="vertical">
        <view class="horizontal">
            <text>Share link url:</text>
            <lineEdit id="lineEdit" bind:this={urlWidget}/>
            <button text="Load" on:clicked={loadPressed}/>
        </view>
        <view>
            <text id="dataWidget" wordWrap="abc" bind:this={dataWidget}>{jsonData}</text>
            <plainTextEdit readOnly="abc" text={jsonData}></plainTextEdit>
        </view>
    </view>
</window>

<style>
    /* 
     * CSS has a few gotchas for now.
     * 1) Some values need to be enclosed with quotes (e.g. `width: '100%';` rather than `width: 100%;`).
     *    See: https://github.com/nodegui/svelte-nodegui/issues/4
     * 2) Classes are not supported yet; they're a bit weird in Qt5.
          See: https://github.com/nodegui/svelte-nodegui/issues/6
     * 3) You can't write element-level rules like `text { color: 'red'; }`, unless they're global (not scoped).
     *    For scoped rules, you have to refer to the underlying native element, e.g. `QLabel { color: 'red'; }`.
     *    See: https://github.com/nodegui/svelte-nodegui/issues/7
     */
    .vertical{
        flex-direction: column;
    }

    .horizontal{
        flex-direction: row;
    }

    #lineEdit{
        flex: 1;
    }
</style>