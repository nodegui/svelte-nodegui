---
title: Components
---

### ActivityIndicator

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_activity_indicator_.activityindicator">Class Docs</a></div>

`<activityIndicator>` is a UI component that shows a progress indicator signaling to the user of an operation running in the background.

```html
<activityIndicator busy="{true}" on:busyChange="{onBusyChanged}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `busy` | `Boolean` | Gets or sets whether the indicator is active. When `true`, the indicator is active.

#### Events

| Name | Description |
|------|-------------|
| `busyChange`| Emitted when the `busy` property is changed.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.ProgressBar`](https://developer.android.com/reference/android/widget/ProgressBar.html)	| [`UIActivityIndicatorView`](https://developer.apple.com/documentation/uikit/uiactivityindicatorview)

### Button

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_button_.button">Class Docs</a></div>

`<button>` is a UI component that displays a button which reacts to a user gesture.

For more information about the available gestures, see [Gestures in the official NativeScript documentation](https://docs.nativescript.org/ui/gestures).

```html
<button text="Button" on:tap="{onButtonTap}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | Sets the label of the button.
| `textWrap` | `Boolean` | Gets or sets whether the widget wraps the text of the label. Useful for longer labels. Default value is `false`.

#### Events

| Name | Description |
|------|-------------|
| `tap` | Emitted when the button is tapped.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.Button`](https://developer.android.com/reference/android/widget/Button.html) | [`UIButton`](https://developer.apple.com/documentation/uikit/uibutton)

### DatePicker

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_date_picker_.datepicker">Class Docs</a></div>

`<datePicker>` is a UI component that lets users select a date from a pre-configured range.

```html
<datePicker date="{someDate}" />
```

`<datePicker>` provides two-way data binding using `bind`.

```html
<datePicker bind:date="{selectedDate}" />
```

See also: [TimePicker](docs#timepicker).

#### Props

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date` | Gets or sets the complete date.
| `minDate` | `Date` | Gets or sets the earliest possible date to select.
| `maxDate` | `Date` | Gets or sets the latest possible date to select.
| `day` | `Number` | Gets or sets the day.
| `month` | `Number` | Gets or sets the month.
| `year` | `Number` | Gets or sets the year.

#### Events

| Name | Description |
|------|-------------|
| `dateChange` | Emitted when the selected date changes.

#### Native Component Reference

| Android |	iOS |
|---------|-----|
| [`android.widget.DatePicker`](https://developer.android.com/reference/android/widget/DatePicker.html) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker)

### Frame

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_frame_.frame">Class Docs</a></div>

`<frame>` is a UI component used to display [`<page>`](docs#page) elements. Every app needs at least a single `<frame>`  element, usually set as the root element. Svelte Native creates the root frame for you.

If you need to create multiple frames, you can do so by wrapping them in a Layout, for example if you want to have 2 frames side-by-side.

```html
<gridLayout columns="*, *">
  <frame col="0"/>
  <frame col="1"/>
</gridLayout>
```

The first child element of a frame will become its `defaultPage`. This is the page shown before any navigation.

```html
<frame>
  <page>
    <actionBar title="Default Page Title" />
    <gridLayout>
      <label text="Default Page Content" />
    </gridLayout>
  </page>
</frame>
```

You can use a component as the default page for a frame, as long as it defines `page` as its root element.

```html
<frame>
  <Home />
</frame>
```

```js
import Home from './Home.svelte'
```

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`org.nativescript.widgets.ContentLayout`](https://github.com/NativeScript/tns-core-modules-widgets/blob/master/android/widgets/src/main/java/org/nativescript/widgets/ContentLayout.java) | [`UINavigationController`](https://developer.apple.com/documentation/uikit/uinavigationcontroller)

### HtmlView

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_html_view_.htmlview">Class Docs</a></div>

`<htmlView>` is a UI component that lets you show static HTML content.

See also: [WebView](docs#webview).

```html
<htmlView html="<div><h1>HtmlView</h1></div>" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `html` | `String` | The HTML content to be shown.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview)

### Image

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_image_.image">Class Docs</a></div>

`<image>` is a UI component that shows an image from an [ImageSource](https://docs.nativescript.org/api-reference/modules/_image_source_) or from a URL.

NativeScript aliases `~` to the app directory.

```html
<image src="~/logo.png" stretch="none" />
```

Images can be loaded from external URLs.

```html
<image src="https://svelte-native.technology/media/todoapp/todo-add-item.png" stretch="none" />
```

Images can also be displayed from the App_Resources folder using the `res://` scheme.

```html
<image src="res://icon" stretch="none" />
```

NativeScript also supports data URIs that are base64 encoded.

```html
<image src="data:Image/png;base64,iVBORw..." stretch="none" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `src` | `String` or [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_) | Gets or sets the source of the image as a URL or an image source.
|`imageSource` | [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_) | Gets or sets the image source of the image.
| `tintColor` | `Color` | (Style property) Sets a color to tint template images.
| `stretch` | `Stretch` | (Style property) Gets or sets the way the image is resized to fill its allocated space.<br/>Valid values: `none`, `aspectFill`, `aspectFit`, or `fill`.<br/>For more information, see [Stretch](https://docs.nativescript.org/api-reference/modules/_ui_enums_.stretch).
| `loadMode` | | Gets or sets the loading strategy for the images on the local file system.<br/>Valid values: `sync` or `async`.<br/>Default value: `async`.<br/>For more information, see [loadMode](https://docs.nativescript.org/api-reference/classes/_ui_image_.image#loadmode).

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.ImageView`](https://developer.android.com/reference/android/widget/ImageView.html) | [`UIImageView`](https://developer.apple.com/documentation/uikit/uiimageview)

### Label

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_label_.label">Class Docs</a></div>

`<label>` is a UI component that displays read-only text.

> **IMPORTANT**: This `<label>` is **not** the same as the HTML `<label>`.

```html
<label text="Label" />
```

#### Styling the label

If you need to style parts of the text, you can use a combination of a [`FormattedString`](https://docs.nativescript.org/angular/ui/ng-ui-widgets/formatted-string) and [`Span`](https://docs.nativescript.org/api-reference/classes/_text_span_.span) elements.

```html
<label textWrap="{true}">
  <formattedString>
    <span text="This text has a " />
    <span text="red " style="color: red" />
    <span text="piece of text. " />
    <span text="Also, this bit is italic, " fontStyle="italic" />
    <span text="and this bit is bold." fontWeight="bold" />
  </formattedString>
</label>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | Gets or sets the text of the label.
| `textWrap` | `Boolean` | Gets or sets whether the label wraps text.<br/>Default value: `false`.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UILabel`](https://developer.apple.com/documentation/uikit/uilabel)

### ListPicker

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_list_picker_.listpicker">Class Docs</a></div>

`<listPicker>` is a UI component that lets the user select a value from a pre-configured list.

```html
<listPicker items="{listOfItems}" selectedIndex="0"
            on:selectedIndexChange="{selectedIndexChanged}" />

<script>
  let listOfItems = ['one', 'two', 'three']
  const selectedIndexChanged = (e) => console.log(e.index)
</script>
```

`<listPicker>` provides two-way data binding for selectedIndex.

```html
<listPicker items="{listOfItems}" bind:selectedIndex={selectedItem}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `items` | `Array<string>` | Gets or sets the items displayed as options in the list picker.
| `selectedIndex` | `Number` | Gets or sets the index of the currently selected item.

#### Events

| Name | Description |
|------|-------------|
| `selectedIndexChange`| Emitted when the currently selected option (index) changes.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.NumberPicker`](https://developer.android.com/reference/android/widget/NumberPicker.html) | [`UIPickerView`](https://developer.apple.com/documentation/uikit/uipickerview)

### ListView

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_list_view_.listview">Class Docs</a></div>

`<listView>` is a UI component that shows items in a vertically scrolling list. To set how the list shows individual items, you use the [`<Template>` component](docs#template-component).

```html
<listView items="{listOfItems}" on:itemTap="{onItemTap}">
  <Template let:item>
    <!-- Shows the list item label in the default color and style. -->
    <label text="{item}" />
  </Template>
</listView>

<script>
  import { Template } from 'svelte-native/components'
  let listOfItems = ['one', 'two', 'three']
</script>
```

`<listView>` does not loop through list items as you would expect when using a regular svelte `each` block. Instead `<listView>` only creates the necessary views to display the currently visible items on the screen, and reuses the views that are already off-screen when scrolled. This concept is called _view recycling_ and is commonly used in mobile apps to improve performance.

You can use the `itemTap` event which provides the index of the tapped item.

```js
function onItemTap(event) {
  console.log(event.index) //item index
}
```

**Multiple Templates Selector Function**

Multiple templates can be used for different layouts of list items, which is similar to [NativeScript Multiple Templates Selector Function](https://docs.nativescript.org/ui/components/list-view#multiple-templates-selector-function). `itemTemplateSelector` is used to select template using `key` which is returned based on your logic.

> **Note:** Use _multiple templates_ approach instead of `{#if}` block, because the _view recycling_ concept does not work as intended since `<listView>` cannot reuse the same template view if off-screen items require different type of template. [See this article](https://medium.com/@alexander.vakrilov/faster-nativescript-listview-with-multiple-item-templates-8f903a32e48f)

```html
<listView items={items} itemTemplateSelector={selectTemplate}>
  <Template let:item key="odd">
      <label text="Odd {item}" />
  </Template>
  <Template let:item key="even">
      <label text="Even {item}" />
  </Template>
</listView>

<script>
  import { Template } from 'svelte-native/components'
  let items = ["item 0", "item 1"]
  function selectTemplate(item, index, items) {
    // Your logic here
    return  (index % 2 == 0) ? "even" : "odd";
  }
</script>
```

> **IMPORTANT NOTE**: unlike Svelte expressions, The `<listView>` will **not** update the item list if you assign the same value to lists (eg `listOfItems.push('four'); listOfItems = listOfItems`). It **will** update if you assign a _new list reference_ (eg `listOfItems = listOfItems.concat('four')` or `listOfItems = [...listOfItems, 'four']`).

#### Props

| Name | Type | Description |
|------|------|-------------|
| `items` | `Array<any>` | An array of items to be shown in the `<listView>`.
| `separatorColor` | `Color` | Sets the separator line color. Set to `transparent` to remove it.
| `itemTemplateSelector` | `(item,index,items) => string` | (optional) returns the key to the template to use for the provided item.

#### Events

| Name | Description |
|------|-------------|
| `itemTap`| Emitted when an item in the `<listView>` is tapped. To access the index of the tapped item, use `event.index`.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.ListView`](https://developer.android.com/reference/android/widget/ListView.html) | [`UITableView`](https://developer.apple.com/documentation/uikit/uitableview)

### Page

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_page_.page">Class Docs</a></div>

`<page>` is a UI component that represents an application screen. NativeScript apps typically consist of one or more `<page>` elements that wrap content such as an [`<actionBar>`](docs#actionbar) and other UI widgets.

```html
<page>
  <actionBar title="My App" />
  <gridLayout>
    <label text="My Content"/>
  </gridLayout>
</page>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `actionBarHidden` | `Boolean` | Shows or hides the `<actionBar>` for the page.<br/>Default value: `false`.
| `backgroundSpanUnderStatusBar` | `Boolean` | Gets or sets whether the background of the page spans under the status bar.<br/>Default value: `false`.
| `androidStatusBarBackground` | `Color` | (Android-only) Gets or sets the color of the status bar on Android devices.
| `enableSwipeBackNavigation` | `Boolean` | (iOS-only) Gets or sets whether the page can be swiped back on iOS.<br/>Default value: `true`.
| `statusBarStyle` | `String` | Gets or sets the style of the status bar.<br/>Valid values:<br/>`light`,<br/>`dark`.

#### Events

| Name | Description |
|------|-------------|
| `navigatedFrom` | Emitted after the app has navigated away from the current page.
| `navigatedTo` | Emitted after the app has navigated to the current page.
| `navigatingFrom` | Emitted before the app has navigated away from the current page.
| `navigatingTo` | Emitted before the app has navigated to the current page.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`org.nativescript.widgets.GridLayout`](https://github.com/NativeScript/tns-core-modules-widgets/blob/master/android/widgets/src/main/java/org/nativescript/widgets/GridLayout.java) | [`UIViewController`](https://developer.apple.com/documentation/uikit/uiviewcontroller)

### Progress

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_progress_.progress">Class Docs</a></div>

`<progress>` is a UI component that shows a bar to indicate the progress of a task.

See also: [ActivityIndicator](docs#activityindicator).

```html
<progress value="{currentProgress}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `Number` | Gets or sets the current value of the progress bar. Must be within the range of 0 to `maxValue`.
| `maxValue` | `Number` | Gets or sets the maximum value of the progress bar.<br/>Default value: `100`.

#### Events

| Name | Description |
|------|-------------|
| `valueChange` | Emitted when the `value` property changes.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.ProgressBar` (indeterminate = false)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIProgressView`](https://developer.apple.com/documentation/uikit/uiprogressview)

### ScrollView

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_scroll_view_.scrollview">Class Docs</a></div>

`<scrollView>` is a UI component that shows a scrollable content area. Content can be scrolled vertically or horizontally.

```html
<scrollView orientation="horizontal">
  <stackLayout orientation="horizontal">
    <label text="this" />
    <label text="text" />
    <label text="scrolls" />
    <label text="horizontally" />
    <label text="if necessary" />
  </stackLayout>
</scrollView>
```

#### Props

| name | type | description |
|------|------|-------------|
| `orientation` | `String` | Gets or sets the direction in which the content can be scrolled: `horizontal` or `vertical`.<br/>Default value: `vertical`.
| `scrollBarIndicatorVisible` | `Boolean` | Specifies if the scrollbar is visible.<br/>Default value: `true`.

#### Events

| Name | Description |
|------|-------------|
| `scroll` | Emitted when a scroll event occurs.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.view`](https://developer.android.com/reference/android/view/View.html) | [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)

### SearchBar

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_search_bar_.searchbar">Class Docs</a></div>

`<searchBar>` is a UI component that provides a user interface for entering search queries and submitting requests to the search provider.

```html
<searchBar hint="Search hint" text="{searchQuery}" on:textChange="{onTextChanged}" on:submit="{onSubmit}" />
```

`<searchBar>` provides two-way data binding for `text`.

```html
<searchBar bind:text="{searchQuery}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `hint` | `String` | Gets or sets placeholder text for the input area.
| `text` | `String` | Gets or sets the value of the search query.
| `textFieldBackgroundColor` | `Color` | Gets or sets the background color of the input area.
| `textFieldHintColor` | `Color` | Gets or sets the color of the placeholder text.

#### Events

| name | description |
|------|-------------|
| `textChange` | Emitted when the text is changed.
| `submit` | Emitted when the search input is submitted.
| `clear` | Emitted when the current search input is cleared through the **X** button in the input area.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.SearchView`](https://developer.android.com/reference/android/widget/SearchView.html)	| [`UISearchBar`](https://developer.apple.com/documentation/uikit/uisearchbar)

### SegmentedBar

<div class="nsref"><a title="NativeScript Documentation" href="http://docs.nativescript.org/api-reference/modules/_ui_segmented_bar_.html">Class Docs</a></div>

`<segmentedBar>` is a UI bar component that displays a set of buttons for discrete selection. It can show text or images.

As opposed to `<tabView>`:
* The position of `<segmentedBar>` is not fixed.
* You can place and style it as needed on the page or inside additional app elements such as hamburger menus.
* You need to handle the content shown after selection separately.

```html
<segmentedBar>
  <segmentedBarItem title="First" />
  <segmentedBarItem title="Second" />
  <segmentedBarItem title="Third" />
</segmentedBar>
```

```html
<segmentedBar selectedIndex="0"
              on:selectedIndexChange="{onSelectedIndexChange}" >
```

`<segmentedBar>` can be populated with `{each}` block.

```html
<segmentedBar>
  {#each listOfItems as item}
    <segmentedBarItem title="{item}" />
  {/each}
</segmentedBar>

<script>
  let listOfItems = [ 'First', 'Second', 'Third' ];
</script>
```

`<segmentedBar>` provides two-way data binding of `selectedIndex`.

```html
<segmentedBar bind:selectedIndex="{selectedItem}" >
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `items` | `Array<segmentedBarItem>` | An array of items to be displayed in the segmented bar. Represents the button labels or icons of the segmented bar.<br/>The array must be created in advance.
| `selectedIndex` | `Number` | Gets or sets the index of the selected item.
| `selectedBackgroundColor` | `Color` | (Style property) Gets or sets the background color of the selected item. To set the background color of the entire bar, use `backgroundColor`.

#### Events

| Name | Description |
|------|-------------|
| `selectedIndexChange`| Emitted when an item on the segmented bar is tapped.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.TabHost`](https://developer.android.com/reference/android/widget/TabHost.html) | [`UISegmentedControl`](https://developer.apple.com/documentation/uikit/uisegmentedcontrol)

### Slider

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_slider_.slider">Class Docs</a></div>

`<slider>` is a UI component that provides a slider control for picking values within a specified numeric range.

```html
<slider value="80" on:valueChange="{onValueChanged}" />
```

`<slider>` provides two-way data binding of `value`:

```html
<slider bind:value="{value}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `Number` | Gets or sets the currently selected value of the slider.<br/>Default value: `0`.
| `minValue` | `Number` | Gets or sets the minimum value of the slider.<br/>Default value: `0`.
| `maxValue` | `Number` | Gets or sets the maximum value of the slider.<br/>Default value: `100`.

#### Events

| Name | Description |
|------|-------------|
| `valueChange`| Emitted when the value of the slider changes.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.SeekBar`](https://developer.android.com/reference/android/widget/SeekBar.html) | [`UISlider`](https://developer.apple.com/documentation/uikit/uislider)

### Switch

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_switch_.switch">Class Docs</a></div>

`<switch>` is a UI component that lets users toggle between two states.

The default state is `false` or OFF.

```html
<switch checked="{true}" on:checkedChange={onCheckedChange} />
```

`<switch>`provides two-way data binding for `checked`.

```html
<switch bind:checked="{switchEnabled}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `Boolean` | Gets or sets the value of the switch selection.<br/>Default value: `false`.

#### Events

| Name | Description |
|------|-------------|
| `checkedChange`| Emitted when the switch selection changes.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.Switch`](https://developer.android.com/reference/android/widget/Switch.html) | [`UISwitch`](https://developer.apple.com/documentation/uikit/uiswitch)

### TabView

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_tab_view_.tabview">Class Docs</a></div>

> **NOTE:** TabView should be considered obsolete as of NS 6.1. Please use [`BottomNavigation`](docs#bottom-navigation) or [`Tabs`](docs#tabs)

`<tabView>` is a navigation component that shows content grouped into tabs and lets users switch between tabs.

```html
<tabView selectedIndex="{selectedIndex}" on:selectedIndexChange="{indexChange}">

  <tabViewItem title="Tab 1">
    <label text="Content for Tab 1" />
  </tabViewItem>

  <tabViewItem title="Tab 2">
    <label text="Content for Tab 2" />
  </tabViewItem>

</tabView>
```

```js
function indexChange(event) {
  let newIndex = event.value
  console.log('Current tab index: ' + newIndex)
}
```

> **NOTE:** Currently, `<tabViewItem>` expects a single child element. In most cases, you might want to wrap your content in a _layout_.

#### Adding icons to tabs

```html
<tabView selectedIndex="{selectedIndex}" iosIconRenderingMode="alwaysOriginal">
  <tabViewItem title="Tab 1" iconSource="~/images/icon.png">
    <label text="Content for Tab 1" />
  </tabViewItem>
  <tabViewItem title="Tab 2" iconSource="~/images/icon.png">
    <label text="Content for Tab 2" />
  </tabViewItem>
</tabView>
```

> **NOTE:** You can use images for tab icons instead of icon fonts. For more information about how to control the size of icons, see [Working with image from resource folders](https://docs.nativescript.org/ui/image-resources).

#### Props

| Name | Type | Description |
|------|------|-------------|
| `selectedIndex` | `Number` | Gets or sets the currently selected tab. Default is `0`.
| `tabTextColor` | `Color` | (Style property) Gets or sets the text color of the tabs titles.
| `tabBackgroundColor` | `Color` | (Style property) Gets or sets the background color of the tabs.
| `selectedTabTextColor` | `Color` | (Style property) Gets or sets the text color of the selected tab title.
| `androidTabsPosition` | `String` | Sets the position of the TabView in Android platform<br/>Valid values: `top` or `bottom`.

#### Events

| Name | Description |
|------|-------------|
| `selectedIndexChange` | Emits an event object containing a `value` property with the index of the tapped `<tabViewItem>`.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.support.v4.view.ViewPager`](https://developer.android.com/reference/android/support/v4/view/ViewPager.html) | [`UITabBarController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller)

### TextField

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/modules/_ui_text_field_">Class Docs</a></div>

`<textField>` is an input component that creates an editable single-line box.

`<textField>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

```html
<textField text="{textFieldValue}" hint="Enter text..." />
```

`<textField>` provides two-way data binding using `bind`.

```html
<textField bind:text="{textFieldValue}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | Gets or sets the value of the field.
| `hint` | `String` | Gets or sets the placeholder text.
| `editable` | `Boolean` | When `true`, indicates that the user can edit the value of the field.
| `maxLength` | `Number` | Limits input to the spcified number of characters.
| `secure` | `Boolean` | Hides the entered text when `true`. Use this property to create password input fields.<br/>Default value: `false`.
| `keyboardType` | `KeyboardType` | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`.
| `returnKeyType` | `ReturnKeyType` | Gets or sets the label of the return key.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`.
| `autocorrect` | `Boolean` | Enables or disables autocorrect.

#### Events

| Name | Description |
|------|-------------|
| `textChange` | Emitted when the text changes.
| `returnPress` | Emitted when the return key is pressed.
| `focus` | Emitted when the field is in focus.
| `blur` | Emitted when the field loses focus.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextField`](https://developer.apple.com/documentation/uikit/uitextfield)

### TextView

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_text_view_.textview">Class Docs</a></div>

`<textView>` is a UI component that shows an editable or a read-only multi-line text container. You can use it to let users type large text in your app or to show longer, multi-line text on the screen.

`<textView>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

```html
<textView text="Multi\nLine\nText" />
```

`<textView>` provides two-way data binding using `bind`.

```html
<textView bind:text="{textViewValue}" />
```

#### Displaying multi-style text

To apply multiple styles to the text in your `<textView>`, you can use `<formattedString>`.

```html
<textView editable="{false}">
  <formattedString>
    <span text="You can use text attributes such as " />
    <span text="bold, " fontWeight="Bold" />
    <span text="italic " fontStyle="Italic" />
    <span text="and " />
    <span text="underline." textDecoration="Underline" />
  </formattedString>
</textView>
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | Gets or sets the value of the component.
| `hint` | `String` | Gets or sets the placeholder text when the component is editable.
| `editable` | `Boolean` | When `true`, indicates that the user can edit the contents of the container.
| `maxLength` | `Number` | Sets the maximum number of characters that can be entered in the container.
| `keyboardType` | `KeyboardType` | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`.
| `returnKeyType` | Gets or sets the label of the return key. Currently supported only on iOS.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`.
| `autocorrect` | `Boolean` | Enables or disables autocorrect.

#### Events

| Name | Description |
|------|-------------|
| `textChange`| Emitted when the text changes.
| `returnPress`| Emitted when the return key is pressed.
| `focus`| Emitted when the container is in focus.
| `blur`| Emitted when the container loses focus.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview)

### TimePicker

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_time_picker_.timepicker">Class Docs</a></div>

`<timePicker>` is a UI component that lets users select time.

See also: [DatePicker](docs#datepicker).

```html
<timePicker hour="{selectedHour}" minute="{selectedMinute}" />
```

`<timePicker>` provides two-way data binding using `bind`.

```html
<timePicker bind:time="{selectedTime}" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `hour` | `Number` | Gets or sets the selected hour.
| `minute` | `Number` | Gets or sets the selected minute.
| `time` | `Date` | Gets or sets the selected time.
| `minHour` | `Number` | Gets or sets the minimum selectable hour.
| `maxHour` | `Number` | Gets or sets the maximum selectable hour.
| `minMinute` | `Number` | Gets or sets the minimum selectable minute.
| `maxMinute` | `Number` | Gets or sets the maximum selectable minute.
| `minuteInterval` | `Number` | Gets or sets the selectable minute interval. For example: 5 or 15 minutes.<br/>Default value: `1`.

#### Events

| Name | Description |
|------|-------------|
| `timeChange` | Emitted when the selected time changes.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.widget.TimePicker`](https://developer.android.com/reference/android/widget/TimePicker) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker)

### WebView

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/classes/_ui_web_view_.webview">Class Docs</a></div>

`<webView>` is a UI component that lets you show web content in your app. You can pull and show content from a URL or a local HTML file, or you can render static HTML content.

See also: [HtmlView](docs#htmlview).

```html
<webView src="http://nativescript-vue.org/" />

<webView src="~/html/index.html" />

<webView src="<div><h1>Some static HTML</h1></div>" />
```

#### Props

| Name | Type | Description |
|------|------|-------------|
| `src` | `String` | Gets or sets the displayed web content.<br/>Valid values: an absolute URL, the path to a local HTML file, or static HTML.

#### Events

| Name | Description |
|------|-------------|
| `loadStarted`| Emitted when the page has started loading in the `<webView>`.
| `loadFinished`| Emitted when the page has finished loading in the `<webView>`.

#### Native Component Reference

| Android | iOS |
|---------|-----|
| [`android.webkit.WebView`](https://developer.android.com/reference/android/webkit/WebView) | [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview)
