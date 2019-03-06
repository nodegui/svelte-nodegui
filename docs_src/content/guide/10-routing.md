---
title: Navigation/Routing
---

Since Svelte Native is a thin bridge between Svelte and NativeScript. It is best if you familiarize yourself with the core concept of [routing in NativeScript](https://docs.nativescript.org/core-concepts/navigation)

Routing in Svelte Native is designed to be very similar and the `svelte-native` module exposes the following functions:

### navigate

Specify the destination page with the mandatory `page` option. This takes a `Svelte` component class.

```html
<!-- { filename: App.svelte } -->
<page>
    <actionBar title="Master" />
    <stackLayout>
        <button text="To Details directly" on:tap="{ () => navigate({ page: Detail }) }" />
    </stackLayout>
</page>

<script>
    import Detail from './Detail.svelte'
    import { navigate } from 'svelte-native'
</script>
```

#### Passing props to the target component

You can specify the props used to create the Svelte component using the `props` option.

```html
<!-- { filename: App.svelte } -->
<page>
    <actionBar title="Master" />
    <stackLayout>
        <button text="To Details directly" on:tap="{showDetailWithProps}" />
    </stackLayout>
</page>

<script>
    import Detail from './Detail.svelte'
    import { navigate } from 'svelte-native'

    function showDetailWithProps() {
        navigate({ 
            page: Detail,
            props: { message: "Hello from master" }
        });
    }
</script>
```

#### Specifying a Frame

Each `<frame>` element has its own navigation stack. If you are using multiple frames, you may want to specify in which frame the navigation will occur. For example, having a button in the side bar that changes the page in the main area. You can do this by adding the `frame` option:

```js
navigate({ 
    page: Detail,
    frame: '<id, or ref, or instance>'
});
```

The value for the `frame` option can be one of the following:
* the `id` of the `<frame>` component (for example: `<frame id="main-frame">`)
* a reference to the `<frame>` (for example: `<frame bind:this="{mainFrame}">`)
* a NativeScript `Frame` instance.

If no frame is specified, the navigation will occur on the [topmost](https://docs.nativescript.org/api-reference/modules/_ui_frame_#topmost) frame.

#### Other Options

For more information about the options that you can pass, see [NavigationEntry](https://docs.nativescript.org/api-reference/interfaces/_ui_frame_.navigationentry).


### goBack

### showModal




