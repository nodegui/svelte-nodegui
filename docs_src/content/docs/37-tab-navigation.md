---
title: Tab Navigation
---

### TabStrip

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_tab_navigation_tab_strip_.tabstrip">Class Docs</a></div>

The TabStrip component is only valid within [`BottomNavigation`](docs#bottom-navigation) or [`Tabs`](docs#tabs) components. It contains a set of [`TabStripItem`](docs#tabstripitem) elements which specify the configuration of the tabs within the parent tab view.

```html
<tabStrip>
  <tabStripItem>
    <label text="Home" />
    <image src="font://&#xf015;" class="fas t-36" />
  </tabStripItem>
  <tabStripItem>
    <label text="Account" />
    <image src="font://&#xf007;" class="fas t-36" />
  </tabStripItem>
</tabStrip>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `iosIconRenderingMode` |  `"automatic", "alwaysOriginal", "alwaysTemplate"` |     Gets or sets the icon rendering mode on iOS.
| `isIconSizeFixed` |   `Boolean` |     When set to true the icon will have fixed size following the platform-specific design guidelines. Default value: `true`.

#### Events

| Name | Description |
|------|-------------|
| `itemTap` | Emitted when a `TabStripItem` is tapped.

### TabStripItem

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_tab_navigation_tab_strip_item_.tabstripitem">Class Docs</a></div>

Tab strip items define the display of a tab selector within a [`TabStrip`](docs#tabstrip). They may contain a [`Label`](docs#label) and/or [`Image`](docs#image) tag.

```html
<tabStrip>
  <tabStripItem>
    <label text="Home" />
    <image src="font://&#xf015;" class="fas t-36" />
  </tabStripItem>
  ...
</tabStrip>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `title` | `string` | Gets or sets the title of the tab strip entry.
| `iconSource` | `string` | Gets or sets the icon source of the tab strip entry. Supports local image paths (~), resource images (res://) and icon fonts (font://).

#### Events

| Name | Description |
|------|-------------|
| `tap` | Emitted when a `TabStripItem` is tapped.

### TabContentItem

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_tab_navigation_tab_content_item_.tabcontentitem">Class Docs</a></div>

A `TabContentItem` contains the view to be displayed when the corresponding TabStripItem is selected.

> **NOTE:** Currently, `TabContentItem` expects a single child element. In most cases, you might want to wrap your content in a layout.

```html
<tabContentItem>
  <stackLayout>
    <label text="Hello From This Tab" />
  </stackLayout>
</tabContentItem>
```

#### Props

None

#### Events

None

### Bottom Navigation

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_tab_navigation_bottom_navigation_.bottomnavigation">Class Docs</a></div>

The BottomNavigation component is a cross-platform implementation of the [Bottom Navigation UI from the Material Design Guidelines](https://material.io/design/components/bottom-navigation.html#usage). Ideal for use when there are 3 to 5 tabs each with their own function.

It can contain a single [`TabStrip`](docs#tabstrip) child (which contains multiple TabStripItems), and multiple [`TabContentItem`](docs#tabcontentitem) children (corresponding to each TabStripItem).

```html
<bottomNavigation bind:selectedIndex={selectedTab}>

  <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
  <tabStrip>
    <tabStripItem>
      <label text="Home" />
      <image src="font://&#xf015;" class="fas t-36" />
    </tabStripItem>
    <tabStripItem class="special">
      <label text="Account" />
      <image src="font://&#xf007;" class="fas t-36" />
    </tabStripItem>
    <tabStripItem class="special">
      <label text="Search" />
      <image src="font://&#xf00e;" class="fas t-36" />
    </tabStripItem>
  </tabStrip>

  <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
  <tabContentItem>
    <gridLayout>
      <label text="Home Page" class="h2 text-center" />
    </gridLayout>
  </tabContentItem>
  <tabContentItem>
    <gridLayout>
      <label text="Account Page" class="h2 text-center" />
    </gridLayout>
  </tabContentItem>
  <tabContentItem>
    <gridLayout>
      <label text="Search Page" class="h2 text-center" />
    </gridLayout>
  </tabContentItem>

</bottomNavigation>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `selectedIndex` | `number` | Gets or sets the selectedIndex of the BottomNavigation.

#### Events

| Name | Description |
|------|-------------|
| `selectedIndexChanged` | Emitted when the selectedIndex property is changed.
| `loaded` | Emitted when the view is loaded.
| `unloaded` | Emitted when the view is unloaded.
| `layoutChanged` | Emitted when the layout bounds of a view change due to layout processing.

#### Native component

| Android | iOS |
|---------|-----|
| [`FrameLayout`](https://developer.android.com/reference/android/widget/FrameLayout)   | [`UITabViewController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller?language=objc)

### Tabs

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_tab_navigation_bottom_navigation_.bottomnavigation">Class Docs</a></div>

The Tabs component is a cross-platform implementation of the [Tabs UI from the Material Design Guidelines](https://material.io/design/components/tabs.html#usage). It is recommended for mid level navigation.

It can contain a single [`TabStrip`](docs#tabstrip) child (which contains multiple TabStripItems), and multiple [`TabContentItem`](docs#tabcontentitem) children (corresponding to each TabStripItem).

Unlike the [`Bottom Navigation`](docs#bottom-navigation) component, the tabs component is made for tabs with a common function and supports transitions and gestures.

```html
<tabs bind:selectedIndex={selectedTab}>

  <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
  <tabStrip>
    <tabStripItem>
      <label text="Home" />
      <image src="font://&#xf015;" class="fas t-36" />
    </tabStripItem>
    <tabStripItem class="special">
      <label text="Account" />
      <image src="font://&#xf007;" class="fas t-36" />
    </tabStripItem>
    <tabStripItem class="special">
      <label text="Search" />
      <image src="font://&#xf00e;" class="fas t-36" />
    </tabStripItem>
  </tabStrip>

  <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
  <tabContentItem>
    <gridLayout>
      <label text="Home Page" class="h2 text-center" />
    </gridLayout>
  </tabContentItem>
  <tabContentItem>
    <gridLayout>
      <label text="Account Page" class="h2 text-center" />
    </gridLayout>
  </tabContentItem>
  <tabContentItem>
    <gridLayout>
      <label text="Search Page" class="h2 text-center" />
    </gridLayout>
  </tabContentItem>

</tabs>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `selectedIndex` | `number` | Gets or sets the selectedIndex of the BottomNavigation.
| `tabsPosition` | `"top", "bottom"` | Gets or sets the position state of the Tabs. Default value: `top`.

#### Events

| Name | Description |
|------|-------------|
| `selectedIndexChanged` | Emitted when the selectedIndex property is changed.
| `loaded` | Emitted when the view is loaded.
| `unloaded` | Emitted when the view is unloaded.
| `layoutChanged` | Emitted when the layout bounds of a view change due to layout processing.

#### Native component

| Android | iOS |
|---------|-----|
| [`FrameLayout`](https://developer.android.com/reference/android/widget/FrameLayout)   | [`UITabViewController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller?language=objc)