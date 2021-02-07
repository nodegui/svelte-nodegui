<script lang="ts">
  import open from 'open';
  export let fileLocation: string | null;
  export let serverAddress: string | null;
</script>

<view id="container">
<text>{`<hr />`}</text>
<view id="status">
  <text>Status: </text>
  {#if !fileLocation} <text style="color: '#8A4648';">NOT STARTED</text>
  {:else} <text style="color: '#9EC718';">RUNNING</text>
  {/if} 
</view>

{#if fileLocation !== null}
  <view id="rootFile">
    <text>Serving file: </text>
    <text>{fileLocation}</text>
  </view>
  <text>Server running at: </text>
  <button class="links" on:clicked={() => open(serverAddress)}>{serverAddress}</button>
{/if}
</view>

<style>
  #container {
    margin-top: 32;
  }

  #status, #rootFile {
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