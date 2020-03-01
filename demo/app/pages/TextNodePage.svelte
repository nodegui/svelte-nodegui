<script>
  import Header from "../Header.svelte";
  let parta = 'parta'
  let partb = 'partb'
</script>

<page>
  <Header title="Text Nodes" />

  <stackLayout class="p-20" >
  
    <label>This is a vanilla text element</label>
    <label>{parta} and {partb}</label>
    <button on:tap="{() => partb = 'partb2'}">Change part b</button>
    <button on:tap="{() => parta = 'parta2'}">Change part a</button>
  </stackLayout>
  
</page>
