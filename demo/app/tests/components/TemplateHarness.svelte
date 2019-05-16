<svelte:options accessors={true}/>

<script>
  import { Template } from "svelte-native/components";
  export let test_subject;
</script>

<Template bind:this={test_subject} extra-prop="test extra prop" let:item>
  <label text="test text {item ? item : ''}" />
</Template>


