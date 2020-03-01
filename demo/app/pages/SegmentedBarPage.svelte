<script>
  import Header from "../Header.svelte";
  let show = true
</script>

<page>
  <Header title="Segmented Bar" />

  <stackLayout class="p-20">
  <button text="Tap me twice" on:tap="{() => show=!show}" />
  {#if show}
    <segmentedBar>
        <segmentedBarItem title="Test 1" />
        <segmentedBarItem title="Test 2" />
        <segmentedBarItem title="Test 3" />
    </segmentedBar>
    {/if}
  </stackLayout>
</page>
