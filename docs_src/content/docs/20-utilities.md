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

For a concrete example of this pattern see svelte native's [listView element source](https://github.com/halfnelson/svelte-native/blob/master/src/dom/native/ListViewElement.ts#L50).

### Property Element

Some NativeScript controls have properties that expect NativeScript views as values. To make this possible using markup, Svelte Native introduce two helpers, the property element and the `prop` directive.

This property element works like the ones in the NativeScript core documentation and set some property of their parent view with the value of the first child of the property element. The tag name is the name of the parent element followed by the property name. For example `<page.actionbar>` would set the `actionbar` property of the parent `page` element.

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

### Property Directive

The Property Element is useful but can be a little verbose. Svelte native also introduces a custom svelte directive called `prop`. The prop directive will take the native view of the component it is on an assign it to a property of the parent element. 

For example our side drawer example from Property Element
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

can be written using the prop element as

```html
<radSideDrawer>
  <stackLayout prop:drawerContent />
  <stackLayout prop:mainContent/>
</radSideDrawer>
```

### Implicit Property Directives

Many advanced controls (including those in the nativescript-ui packages) use elements to provide configuration. These configuration properties need to be assigned to a parent property but often only have one valid parent property to which they can be assigned, so the `prop:` or Property Element becomes boilerplate

Take this example from `nativescript-ui-dataform`:

```html
 <radDataForm source={ticket} metadata={ticketMetadata}>
    <entityProperty prop:properties  name="price" index="4" readOnly="true">
        <propertyEditor prop:editor type="Decimal" />
    </entityProperty>
    <entityProperty prop:properties name="numberOfTickets" displayName="Number of Tickets" index="5">
        <propertyEditor prop:editor type="Stepper">
            <propertyEditorParams prop:params minimum="0" maximum="100" step="2" />
        </propertyEditor>
    </entityProperty>
</radDataForm>
```

on a large form, the `prop:properties` `prop:editor` and `prop:params` can get repetitive. Svelte Native lets you register a configuration element with a default property name for the `prop:` directive. When this is set, the `prop:` directive is not needed at all:

```html
<radDataForm source={ticket} metadata={ticketMetadata}>
    <entityProperty name="price" index="4" readOnly="true">
        <propertyEditor type="Decimal" />
    </entityProperty>
    <entityProperty name="numberOfTickets" displayName="Number of Tickets" index="5">
        <propertyEditor type="Stepper">
            <propertyEditorParams minimum="0" maximum="100" step="2" />
        </propertyEditor>
    </entityProperty>
</radDataForm>
```