<svelte:options accessors={true}/>

<stackLayout bind:this={test_subject}>
   {#if enabled}
   <label prop:testproperty text="test label"/>
   {/if}

    <label bind:this={array_test_subject}>
        <formattedString>
            <span text="part1" />
            some text node to be ignored
            <span text="part2" />
        </formattedString>
    </label>

</stackLayout>

<script>
    export let test_subject;
    export let array_test_subject;
    export let enabled = true;
</script>