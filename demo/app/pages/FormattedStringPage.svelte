<script>
  import Header from "../Header.svelte";
  let alive = true;
</script>

<page>
  <Header title="Formatted String" />
  <stackLayout>
    <button on:tap={() => (alive = true)}>Alive</button>
    <button on:tap={() => (alive = false)}>Dead</button>
    <label>
      <formattedString>
        {#if alive}
          <span text="Alive" />
          <span class="fas" text="&#xf004;"/>
        {:else}
          <span text="Dead" />
          <span class="fas" text="&#xf54c;"/>
        {/if}
      </formattedString>
    </label>
  </stackLayout>

</page>
