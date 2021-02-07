<script lang="ts">
  export let rootFolder: string;
  export let serverAddress: string ;

</script>

<text>Status: {#if !rootFolder} not started {:else} running {/if} </text>

  <text> {#if rootFolder} Server Address: {serverAddress} {/if}</text>
