This is a barebones svelte-native project template. It was created directly from a nativescript core project template. It provides an easy way to get started with a svelte native project.

# Usage

You can get started with this using `degit`

```bash
$ degit halfnelson/svelte-native-template myapp
```

your svelte-native app will be found in the `myapp` folder

# Recreating From Scratch

This was created using:

Create ns core app

```bash
    tns create svelte-ns-testapp --appid sntest.halfnelson.github.io --ts
```

Install svelte, svelte-native, svelte-loader

```bash
    $ npm install svelte@beta
    $ npm install svelte-native
    $ npm install svelte-loader
```

Append svelte-loader to end module rules

```
{
    test: /\.svelte$/,
    exclude: /node_modules/,
    use: 'svelte-loader'
}
```   

Remove nativescript files from `app` except for  `package.json` and `app.ts` and `app.css`

make the following changes to the app folder:

add `svelte-components.d.ts`:

```js
declare module "*.svelte" {
    export default SvelteComponent;
}
```

change `app.ts` to:

```js
import { svelteNative } from "svelte-native";
import App from  "./App.svelte";
svelteNative(App, {});
```

add `App.svelte`:

```html
<page xmlns="tns" class="page">
    <actionBar title="My App" icon="" class="action-bar">
    </actionBar>
    <stackLayout class="p-20">
        <label text="Tap the button" class="h1 text-center"/>
        <button text="TAP" on:tap="{ onTap }" class="btn btn-primary btn-active"/>
        <label text="{ message }" class="h2 text-center" textWrap="true"/>
    </stackLayout>
</page>

<script>
    let counter = 42;
    let message;
    $: message = (counter <= 0) 
                    ? "Hoorraaay! You unlocked the Svelte-Native clicker achievement!"
                    : `${counter} taps left`
    
    const onTap = () => counter--;
</script>
```

Run the app with an ensure it worked

```bash
tns run android --bundle
```





