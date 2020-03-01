<svelte:options accessors={true}/>

<tabs bind:this="{test_subject}">
    <tabContentItem>
        <label text="tab content 1"></label>
    </tabContentItem>
    {#if show_extra_tab}
        <tabContentItem>
            <label text="extra tab content"></label>
        </tabContentItem>
    {/if}
    <tabStrip bind:this="{tab_strip_subject}">
        <tabStripItem title="tab button 1"></tabStripItem>
        {#if show_extra_tab}
            <tabStripItem title="extra tab button"></tabStripItem>
        {/if}
    </tabStrip>
</tabs>

<script>
    export let test_subject;
    export let tab_strip_subject;
    export let show_extra_tab = false
</script>
