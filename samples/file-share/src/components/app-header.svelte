<script>
  import { appData } from "../stores/app-data";
</script>

<text id="app_name">{$appData.name}</text>
<text id="tag">Easily share a file on your local network. </text>

<style>
  #app_name {
    font-size: 32px;
  }

  #app_name, #tag {
    color: '#AAAAAA';
  }
</style>
