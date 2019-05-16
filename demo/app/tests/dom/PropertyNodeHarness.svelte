<svelte:options accessors={true}/>

<fragment bind:this={test_subject}>
    <fragment.testproperty>
        <label text="test label"/>
    </fragment.testproperty>
</fragment>

<script>
    export let test_subject;
</script>