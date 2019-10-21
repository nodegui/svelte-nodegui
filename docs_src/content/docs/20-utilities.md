---
title: Utilities
---

### Template Component

The `<Template>` svelte component lets you define markup that is reused as a template. It is currently used to render listItems in the `<listView>` component.

#### Basic usage

```html
<page>
  <listView items="{items}">
    <Template let:item={i}>
      <label text="{i}" />
    </Template>
  </listView>
</page>
<script>
  import { Template } from 'svelte-native/components'
  let items = ['one', 'two', 'three']
</script>
```

> **NOTE** The template element here has a capital `T` and is imported from `svelte-native/components`. This is because it is a Svelte component not a NativeScript element.

#### Advanced usage

You can use `Template` to implement custom NativeScript elements that require a template or multiple templates.

When `Template` is rendered by svelte, it outputs a special DOM element called `template` which has a `component` attribute. Implementations such as svelte native's binding to `listView` look for the `template` elements and use the component to instantiate and render the template content.

Any extra properties added to the `Template` component are passed down and added to the `template` DOM element.

For concrete example of this pattern see svelte native's [listView element source](https://github.com/halfnelson/svelte-native/blob/master/src/dom/native/ListViewElement.ts#L50).

### Property Element

Some NativeScript controls have properties that expect NativeScript views as values. To make this possible using markup, Svelte Native introduces the property element. This element works like the ones in the NativeScript core documentation and set some property of their parent view with the value of the first child of the property element. The tag name is the name of the parent element followed by the property name. For example `<page.actionbar>` would set the `actionbar` property of the parent `page` element.

#### An Example

The `<radSideDrawer>` component is part of the [Progress NativeScript UI](https://docs.nativescript.org/ui/professional-ui-components/SideDrawer/getting-started) package.

The `<radSideDrawer>` component requires the `drawerContent` and `mainContent` properties to be set to `View` instances. Using Property Elements, you can do this with a few lines of code:

```html
<radSideDrawer>
  <radSideDrawer.drawerContent>
    <stackLayout />
  </radSideDrawer.drawerContent>
  <radSideDrawer.mainContent>
    <stackLayout />
  </radSideDrawer.mainContent>
</radSideDrawer>
```

Without the Property Elements, you need to go a more tedious and error-prone route:

```html
<radSideDrawer bind:this="{drawer}">
  <stackLayout bind:this="{drawerContent}" />
  <stackLayout bind:this="{mainContent}" />
</radSideDrawer>
```

```js
import { onMount } from 'svelte'

let drawer
let drawerContent
let mainContent

onMount(() => {
  drawer.nativeView.mainContent = mainContent.nativeView
  drawer.nativeView.drawerContent = drawerContent.nativeView
})
```