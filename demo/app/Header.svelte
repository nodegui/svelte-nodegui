<actionBar title="{title}" >
    {#if isAndroid}
        <navigationButton icon="res://menu" on:tap="{toggleDrawer}" />
    {:else}
        <actionItem icon="res://menu" ios.position="left" on:tap="{toggleDrawer}" />
    {/if}
    <slot></slot>
</actionBar>

<script>
    import { toggleDrawer } from './Nav.ts'
    import { isAndroid } from "@nativescript/core/platform"
    export let title = ""
</script>