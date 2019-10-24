---
title: ActionBars
---

### ActionBar

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.actionbar">Class Docs</a></div>

`<actionBar>` is a UI component that provides a toolbar at the top of the activity window.

This component is the NativeScript abstraction for the Android [app bar](https://developer.android.com/training/appbar/) and the iOS [navigation bar](https://developer.apple.com/design/human-interface-guidelines/ios/bars/navigation-bars/).


#### Using a title

```html
<actionBar title="MyApp" />
```

#### Using a custom title view

```html
<actionBar>
  <stackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <label text="NativeScript" fontSize="24" verticalAlignment="center" />
  </stackLayout>
</actionBar>
```

#### Setting an app icon for Android

```html
<actionBar title="My App" android.icon="res://icon" android.iconVisibility="always" />
```

#### Removing the border

By default, a border is drawn at the bottom of the `<actionBar>`. In addition to the border, on iOS devices a translucency filter is also applied over the `<actionBar>`.

To remove this styling from your app, you can set the `flat` property to `true`.

```html
<actionBar title="My App" flat="true" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `title` | `String` | Gets or sets the title shown in the bar.
| `android.icon` | `String` | Gets or sets the icon to be shown on Android devices.
| `android.iconVisibility` | `String` | Gets or sets icon visibility on Android devices.
| `flat` | `boolean` | Removes the border on Android and the translucency on iOS. Default value is `false`.

#### Native component

| Android | iOS |
|---------|-----|
| [`android.widget.Toolbar`](https://developer.android.com/reference/android/widget/Toolbar.html)	| [`UINavigationBar`](https://developer.apple.com/documentation/uikit/uinavigationbar)


### ActionItem

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.actionitem">Class Docs</a></div>

`<actionItem>` is a UI component that lets you add action buttons to the `<actionBar>` component.


#### Basic use

```html
<actionBar title="My App">
  <actionItem on:tap="{onTapShare}"
    ios.systemIcon="9" ios.position="left"
    android.systemIcon="ic_menu_share" android.position="actionBar" />
  <actionItem on:tap="{onTapDelete}"
    ios.systemIcon="16" ios.position="right"
    text="delete" android.position="popup" />
</actionBar>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `ios.systemIcon` | `Number` | Gets or sets the icon of the `ActionItem` for iOS. The value must be a number from the [`UIBarButtonSystemItem` enumeration](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIBarButtonItem_Class/#//apple_ref/c/tdef/UIBarButtonSystemItem).
| `android.systemIcon` | `String` | Gets or sets the icon of the `ActionItem` for Android. The value must be the name of a [drawable resource](https://developer.android.com/reference/android/R.drawable).
| `ios.position` | `String` | Gets or sets the position of the `ActionItem` within the `ActionBar` for iOS.<br/>Valid values: `left` or `right`.<br/>Default value is `left`.
| `android.position` | `String` | Gets or sets the position of the `ActionItem` within the `ActionBar` for Android.<br/>Valid values:<br/>`actionBar` (places the item in the ActionBar),<br/>`popup` (places the item in the options menu; renders items as text), and<br/>`actionBarIfRoom` (places the item in the `ActionBar` if there is enough room for it there; otherwise, places it in the options menu).<br/>Default value is `actionBar`.

#### Events

| Name | Description |
|------|-------------|
| `tap`| Emitted when the `ActionItem` is tapped.

#### Native component

| Android | iOS |
|---------|-----|
| [`android.widget.Toolbar`](https://developer.android.com/reference/android/widget/Toolbar.html) | [`UINavigationItem`](https://developer.apple.com/documentation/uikit/uinavigationitem)


### NavigationButton

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.navigationbutton">Class Docs</a></div>

`<navigationButton>` is a UI component that provides an abstraction for the Android navigation button and the iOS back button.

Extends [`<actionItem>`](docs#actionitem).


```html
<actionBar title="My App">
  <navigationButton text="Go back" android.systemIcon="ic_menu_back" on:tap="{goBack}" />
</actionBar>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | (iOS-only) Sets the text of the button.
| `android.systemIcon` | `String` | (Android-only) The icon to be shown in the button. You can specify any system icon whose name begins with the `ic_` prefix. For a complete list of the available icons, see [the `R.drawable` Android class](https://developer.android.com/reference/android/R.drawable.html).

#### Events

| Name | Description |
|------|-------------|
| `tap`| Emitted when the `<navigationButton>` is tapped.

#### Native component

| Android | iOS |
|---------|-----|
| [`android.widget.Toolbar`](https://developer.android.com/reference/android/widget/Toolbar.html) | [`UINavigationItem`](https://developer.apple.com/documentation/uikit/uinavigationitem)
