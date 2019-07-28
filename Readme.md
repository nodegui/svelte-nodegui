Allows the use of [Svelte (v3)](https://github.com/sveltejs/svelte) within a [NativeScript](https://github.com/nativescript/nativescript) application.
(Thanks to nativescript-vue for their dom implementation)

**__This is still alpha software, use at own risk, contributions welcome__**

See https://svelte-native.technology for docs and tutorials

![todo in svelte-native](https://raw.githubusercontent.com/halfnelson/svelte-native/master/nativescript-svelte-todo.gif)


## Features

Svelte-Native includes Svelte specific integrations such as

 * The ability to use svelte components to create native applications on top of NativeScript core
 * Svelte specific navigation and modals eg `navigate({ page: MySvelteComponent })`
 * Integration with svelte's transistions eg `<label transition:fade="{duration: 2000}">`
 * Integration with sveltes scoped styles

## Todo
 - [x] At least 1 emoji in readme
 - [ ] More Tests 😳
 

## Installation

You can get started developing with this using the [latest template app](https://github.com/halfnelson/svelte-native-template)

```bash
$ npx degit halfnelson/svelte-native-template myapp
```

A fresh svelte-native app will be found in the `myapp` folder

Once installed, the build workflow is to use the `tns build` or `tns run` commands as normal. 

## Usage

App.svelte
```html
<page>
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
import App from './components/App.svelte';

import { svelteNative } from 'svelte-native'

svelteNative(App, {msg: "Hi from launcher"});
```


