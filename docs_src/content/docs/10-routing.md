---
title: Navigation/Routing
---

Since Svelte Native is a thin bridge between Svelte and NativeScript. It is best if you familiarize yourself with the core concept of [routing in NativeScript](https://docs.nativescript.org/core-concepts/navigation).

Routing in Svelte Native is designed to be very similar and the `svelte-native` module exposes the following functions:

### navigate

Specify the destination page with the mandatory `page` option. This takes a `Svelte` component class.

```html
<!--{ filename: 'App.svelte' }-->
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
<!--{ filename: 'App.svelte' }-->
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
    })
  }
</script>
```

#### Specifying a Frame

Each `<frame>` element has its own navigation stack. If you are using multiple frames, you may want to specify in which frame the navigation will occur. For example, having a button in the sidebar that changes the page in the main area. You can do this by adding the `frame` option:

```js
navigate({
  page: Detail,
  frame: '<id, or ref, or instance>'
})
```

The value for the `frame` option can be one of the following:

* the `id` of the `<frame>` component (for example: `<frame id="main-frame">`)
* a reference to the `<frame>` (for example: `<frame bind:this="{mainFrame}">`)
* a NativeScript `Frame` instance.

If no frame is specified, the navigation will occur on the [topmost](https://docs.nativescript.org/api-reference/modules/_ui_frame_#topmost) frame.

#### Other Options

For more information about the options that you can pass, see [NavigationEntry](https://docs.nativescript.org/api-reference/interfaces/_ui_frame_.navigationentry).

### goBack

To navigate back to a previous page, use the `goBack` function.

```html
<!--{filename: 'App.svelte'}-->
<page>
  <actionBar title="Detail"/>
  <stackLayout>
    <button text="Back to Master" on:tap="{goBack}" />
  </stackLayout>
</page>

<script>
  import { goBack } from 'svelte-native'
</script>
```

To cause the back to happen on another frame, pass in a frame reference or id to the  `frame` option.

```js
goBack({ frame: 'sub-nav-frame' })
```

`goBack` by default goes back to the previous page, you can go back multiple pages if you specify a `page` reference in options.

```js
goBack({ to: options_page_ref })
```

### showModal

To show a page or component modally use the `showModal` function. Specify the page to open using the `page` option and props using the `props` option (just like in [navigate](#navigate)).

```html
<!--{ filename: 'App.svelte'} -->
<page>
  <actionBar title="Master" />
  <stackLayout>
    <button text="Open Modal" on:tap="{launchModal}" />
  </stackLayout>
</page>

<script>
  import DetailPage from './DetailPage.svelte'
  import { showModal } from 'svelte-native'
  function launchModal() {
    showModal({ page: DetailPage, props: { msg: 'hi' } })
  }
</script>
```

```html
<!--{filename: "DetailPage.svelte" }-->
<frame id="detail-page-frame">
  <page>
    <label text="Detail Page" />
  </page>
</frame>
```

The other options available correspond directly to those in [ShowModalOptions](https://docs.nativescript.org/api-reference/interfaces/_ui_core_view_base_.showmodaloptions) and are passed through to the underlying NativeScript showModal method.

The `showModal` function returns a promise which resolves to whatever is passed to `closeModal`.

> **NOTE** The modal is opened in a new navigation context. If you want to allow navigation within the modal, or show an action bar, you will need to wrap the target page in a `frame` element. If you don't need any navigation within the modal then this won't be necessary.

### closeModal

The `closeModal` function closes the current modal view and optionally returns a value to the caller of the original `showModal` via a promise result.

```html
<!--{ filename: 'App.svelte'} -->
<page>
  <actionBar title="Master" />
  <stackLayout>
    <button text="Open Modal" on:tap="{launchModal}" />
    <label text="{modalResult}" />
  </stackLayout>
</page>

<script>
  import DetailPage from './DetailPage.svelte'
  import { showModal } from 'svelte-native'

  let modalResult = "Waiting for modal"
  async function launchModal() {
    let result = await showModal({ page: DetailPage, props: { msg: 'hi' } })
    modalResult = `got result: ${result}`
  }
</script>
```

```html
<!--{filename: "DetailPage.svelte" }-->
<frame id="detail-page-frame">
  <page>
    <button text="Close me" on:tap="{ () => closeModal('hi from modal') }" />
  </page>
</frame>

<script>
  import { closeModal } from 'svelte-native'
</script>
```
