<script>
  import {onMount} from 'svelte'

  export let stack
  export let last
  export let first
</script>

<svelte:options accessors={true}/>
<page class="page">
  <stackLayout bind:this={stack} class="p-20">
    <label bind:this={first} text="First" />
    <label bind:this={last} text="Last" />
  </stackLayout>
</page>