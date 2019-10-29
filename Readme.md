# Svelte Native

Create Mobile applications using native widgets via Svelte [Svelte](https://github.com/sveltejs/svelte) and [NativeScript](https://github.com/nativescript/nativescript).

See https://svelte-native.technology for docs and tutorials

![todo in svelte-native](https://raw.githubusercontent.com/halfnelson/svelte-native/master/nativescript-svelte-todo.gif)

## Features

Svelte-Native includes Svelte specific integrations such as

 * The ability to use svelte components to create native applications on top of NativeScript core
 * Svelte specific navigation and modals eg `navigate({ page: MySvelteComponent })`
 * Integration with svelte's transistions eg `<label transition:fade="{duration: 2000}">`
 * Integration with sveltes scoped styles
 * Complete coverage of the Nativescript core UI modules
 * Uses unmodified Svelte and Nativescript modules

## Work In Progress

While Svelte Native is feature complete, there are some items outstanding to bring it to the level of other Nativescript library integrations

 - [x] Full support for the Progress professional UI components [#22](https://github.com/halfnelson/svelte-native/issues/22)
 - [ ] Improved documentation around importing Nativescript plugins [#45](https://github.com/halfnelson/svelte-native/issues/45)
 - [ ] An examples page that shows open source applications made with Svelte Native [#51](https://github.com/halfnelson/svelte-native/issues/51)
 - [x] At least 1 emoji in readme.md :+1:
 - [ ] More Tests 😳 [#54](https://github.com/halfnelson/svelte-native/issues/54)
 

## Installation

You can get started developing with this using the latest template

```bash
$ npm install -g nativescript
$ tns create myapp --template tns-template-blank-svelte
```

A fresh Svelte Native app will be found in the `myapp` folder

Once installed use the `tns preview`, `tns build` or `tns run` commands as for a normal NativeScript application. 

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

## Examples

### Svelte Native HackerNews

Simple HackerNews client in Svelte Native.

See https://github.com/halfnelson/svelte-native-hackernews for the repo.

![HackerNews Example Image](https://raw.githubusercontent.com/halfnelson/svelte-native-hackernews/master/nativescript-svelte-hn.gif)

### Svelte Native Grocery

Grocery app example in Svelte Native.

See https://github.com/halfnelson/svelte-native-grocery for the repo.

![Grocery Example Image](https://raw.githubusercontent.com/halfnelson/svelte-native-grocery/master/nativescript-svelte-grocery.gif)

### Svelte Native Realworld

Realworld implementation app in Svelte Native.

See https://github.com/halfnelson/svelte-native-realworld for the repo.

![Realworld Example Image](https://raw.githubusercontent.com/halfnelson/svelte-native-realworld/master/nativescript-svelte-realworld.gif)


## Credits

The DOM implementation is based on the one from Nativescript-Vue. Thanks!
The API Docs were ported from the Nativescript-Vue Too
The Site Design is from SvelteJS

