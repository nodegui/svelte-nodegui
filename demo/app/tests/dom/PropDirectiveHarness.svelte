<svelte:options accessors={true}/>

<stackLayout bind:this={test_subject}>
   {#if enabled}
   <label prop:testproperty text="test label"/>
   {/if}
</stackLayout>

<script>
    export let test_subject;
    export let enabled = true;
</script>