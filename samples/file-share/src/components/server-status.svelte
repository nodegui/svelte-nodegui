<script lang="ts">
  import open from 'open';
  export let rootFolder: string;
  export let serverAddress: string[] | null;
</script>

<view id="container">
<text>{`<hr />`}</text>
<view id="status">
  <text>Status: </text>
  {#if !rootFolder} <text style="color: '#8A4648';">NOT STARTED</text>
  {:else} <text style="color: '#9EC718';">RUNNING</text>
  {/if} 
</view>
{#if rootFolder}
  <text> Server Addresses:</text>
  {#each serverAddress as addr, index}
    <button class="links" on:clicked={() => open(addr)}>{addr}</button>
  {/each}
  {/if}
</view>

<style>
  #container {
    margin-top: 32;
  }

  #status {
    flex-direction: row;
  }

  .links {
    margin-top: 0;
    background: '#1B7E96';
    border-radius: 8;
    padding-top: 4;
    padding-bottom: 4;
  }
</style>