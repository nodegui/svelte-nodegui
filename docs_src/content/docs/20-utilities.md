---
title: Utilities
---

### Template Component

The `<Template>` svelte component lets you define markup that is reused as a template. It is currently used to render listItems in the `<listView>` component.

## Basic usage

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

## Advanced usage

You can use `Template` to implement custom NativeScript elements that require a template or multiple templates.

When `Template` is rendered by svelte, it outputs a special DOM element called `template` which has a `component` attribute. Implementations such as svelte native's binding to `listView` look for the `template` elements and use the component to instantiate and render the template content.

Any extra properties added to the `Template` component are passed down and added to the `template` DOM element.

For concrete example of this pattern see svelte native's [listView element source](https://github.com/halfnelson/svelte-native/blob/master/src/dom/native/ListViewElement.ts#L50)