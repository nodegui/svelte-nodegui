<script lang="ts">
    import { QMainWindow, QSettings } from '@nodegui/nodegui';
    import { onMount } from 'svelte';

    let win: any;
    const settings: QSettings = new QSettings("MyCompany", "MyApp");

    /**
     * @see https://doc.qt.io/qt-5/restoring-geometry.html
     * @see https://github.com/nodegui/nodegui/issues/801
     */
    function onWindowClose(args: any): void {
        console.log(`Window "close" event 1`, args);
        const nativeWindow: QMainWindow = win.nativeView;
        try {
            const geometrySettings = (nativeWindow as any).saveGeometry();
            const windowState = (nativeWindow as any).saveState();
            settings.setValue("geometry", geometrySettings);
            settings.setValue("windowState", windowState);
        } catch(e){
            console.error("Error persisting QMainWindow geometry", e);
        }
    }

    onMount(() => {
        (window as any).win = win; // Prevent garbage collection.
        win.nativeView.show();
        return () => {
            delete (window as any).win;
        };
    });
</script>

<svelte:options namespace="foreign" />
<window bind:this={win} windowTitle="Hello World" on:Close={onWindowClose}>
    <view id="container" style="background-color: '#41444A';">
        <text style="color: white;">Some text with actual children</text>
        <button on:clicked={(checked) => console.log("Clicked!", checked)} id="nice_button" text="Press me"/>
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
