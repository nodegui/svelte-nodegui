<svelte:options accessors={true}/>

<listView bind:this="{test_subject}" items={items} itemTemplateSelector={selectTemplate}>
  <Template key="odd">
     <label>Odd</label>
  </Template>
  <Template key="even">
      <label>Even</label>
  </Template>
</listView>

<script>
    import { Template } from 'svelte-native/components'
    export let test_subject;

    let items = ["item 0", "item 1"]

    function selectTemplate(item, index, items) {
        return  (index % 2 == 0) ? "even" : "odd";
    }

</script>
