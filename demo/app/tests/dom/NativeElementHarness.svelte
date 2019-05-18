<svelte:options accessors={true}/>

<label bind:this="{test_subject}" textWrap="{true}" style="color: red" class="testlabel" class:boolclass="{true}" class:boolclassf="{false}" >Text Content</label>

<script>
    export let test_subject;
</script>
<style>
    .testlabel {
        background-color: blue;
    }
</style>
