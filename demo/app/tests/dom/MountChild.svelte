<svelte:options accessors={true}/>

<label class="h2" text="Child-A" bind:this={childA} />
<label class="h2" text="Child-B" bind:this={childB} />


<script>
    export let childA;
    export let childB;
</script>