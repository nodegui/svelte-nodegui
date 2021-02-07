<script lang="ts">
  import open from 'open';
  export let rootFolder: string;
  export let serverAddress: string[] | null;
</script>

<text>Status: {#if !rootFolder} not started {:else} running {/if} </text>
<view>
{#if rootFolder}
  <text> Server Addresses:</text>
  {#each serverAddress as addr, index}
    <button class="links" on:clicked={() => open(addr)}>{addr}</button>
  {/each}
  {/if}
</view>

<style>
  .links {
    margin-top: 8;
    padding: 2;
    background: '#414445';
  }
</style>