WIP proof of concept for wiring svelte 3 up to nativescript. based on the wonderful nativescript-vue.

App.html
```html
<page xmlns="tns" actionBar="{ab ? ab.nativeView : null}">
    <actionBar bind:this="{ab}" title="Svelte Native"></actionBar>
    <stackLayout>
        <label text="{msg}"></label>
        <button text="hi" on:tap="{toggle}"></button>
    </stackLayout>
</page>

<script>
  export let msg = 'Hello World!'
  let ab;
  const toggle = () => {
      msg = "Hi from svelte"
  }
</script>
```

Main.ts
```js
import App from './components/App.html';

import { svelteNative } from 'svelte-native'

svelteNative(App, {msg: "Hi from launcher"});
```
