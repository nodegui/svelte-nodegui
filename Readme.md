WIP proof of concept for wiring svelte 3 up to nativescript. based on the wonderful nativescript-vue.

![todo in svelte-native](https://raw.githubusercontent.com/halfnelson/svelte-native/master/nativescript-svelte-todo.gif)

## todo

 - [x] Port dom from nativescript-vue and add svelte required items
 - [x] Get basic todo app working
 - [x] Expose navigation
 - [x] Modals
 - [x] wire up sveltes in,out and animate to Nativescripts native animations
 - [x] work out an alternative for `<ios>` and `<android>` tags ( just import isIOS and isAndroid from platform and use an if statement)
 - [ ] alternative for sveltes css intensive transitions (svelte-native/transition)
 - [ ] publish on npm
 - [ ] Port grocery app
 - [x] At least 1 emoji in readme
 - [ ] Tests 😳
 - [ ] Docs



## usage

Until this is package is up on npm, you can install it via:

```bash
$ npm run build
$ cd dist && npm link
```
you can now use `npm link svelte-native` in your projects to install this package

App.html
```html
<page xmlns="tns">
    <actionBar title="Svelte Native"></actionBar>
    <stackLayout>
        <label text={msg}></label>
        <button text="Change" on:tap="{toggle}"></button>
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


see https://github.com/halfnelson/svelte-native-test-app for an example project
