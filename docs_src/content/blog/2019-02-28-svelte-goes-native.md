---
title: Svelte Goes Native
description: Svelte comes to NativeScript
pubdate: 2019-02-28
author: Halfnelson
authorURL: https://twitter.com/halfnelson_au/
---

Svelte is a next gen web framework that compiles your component code into fast, efficient, vanilla javascript DOM manipulations. 

Nativescript takes the native api surface of iOS and Android and exposes them as vanilla javascript objects.

Svelte Native is a library that exposes NativeScripts view objects as DOM elements which can be manipulated by Svelte components.

![nativescript + svelte = svelte-native](/logos_combined.svg)



### But doesn't NativeScript already offer Vue and Angular support?

It does!, and they are supported by the nativescript developers. However the marriage of Svelte's tiny payload size, low boilerplate component definitions, and hyper efficient DOM updates seem like a great fit for mobile development.



### What does it look like

```html
<page xmlns="tns" class="page">
    <actionBar title="Svelte Native App" class="action-bar" />
    <stackLayout class="p-20">
        <label text="Tap the button" class="h1 text-center" />
        <button text="TAP" on:tap="{ () => counter-- }" class="btn btn-primary btn-active" />
        <label class="h2 text-center" textWrap="true">{message}</label>
    </stackLayout>
</page>

<script>
    let counter = 42;
    let message;
    $: message = (counter <= 0)
                    ? "Hoorraaay! You unlocked the Svelte-Native clicker achievement!"
                    : `${counter} taps left`
</script>
```

Jump into the [Docs](/docs) or follow the [Tutorial](/tutorial) to get started.

