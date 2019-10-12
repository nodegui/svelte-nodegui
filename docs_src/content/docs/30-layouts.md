---
title: Layouts
---

### AbsoluteLayout

The `<absoluteLayout>` container is the simplest layout container in NativeScript.

`<absoluteLayout>` has the following behavior:

* Uses a pair of absolute left/top coordinates to position its children.
* Doesn't enforce any layout constraints on its children.
* Doesn't resize its children at runtime when its size changes.

#### Examples

#### A grid-like layout

The following example creates a simple grid. For more information about creating grid layouts, see [GridLayout](/docs#GridLayout).

```html
<absoluteLayout backgroundColor="#3c495e">
  <label text="10,10" left="10" top="10" width="100" height="100" backgroundColor="#4383b8"/>
  <label text="120,10" left="120" top="10" width="100" height="100" backgroundColor="#4383b8"/>
  <label text="10,120" left="10" top="120" width="100" height="100" backgroundColor="#4383b8"/>
  <label text="120,120" left="120" top="120" width="100" height="100" backgroundColor="#4383b8"/>
</absoluteLayout>
```
<img width=320 src="/media/docs/layouts/absolute_layout_grid.svg" />

#### Overlapping elements

The following example creates a group of overlapping items.

```html
<absoluteLayout backgroundColor="#3c495e">
  <label text="10,10" left="10" top="10" width="100" height="100" backgroundColor="#286290"/>
  <label text="30,40" left="30" top="40" width="100" height="100" backgroundColor="#4383b8"/>
</absoluteLayout>
```
<img width=320 src="/media/docs/layouts/absolute_layout_overlap.svg" />

#### Additional children props

When an element is a direct child of `<absoluteLayout>`, you can work with the following additional properties.

| Name | Type | Description |
|------|------|-------------|
| `top` | `Number` | Gets or sets the distance, in pixels, between the top edge of the child and the top edge of its parent.
| `left` | `Number` | Gets or sets the distance, in pixels, between the left edge of the child and the left edge of its parent.

### DockLayout

`<DockLayout>` is a layout container that lets you dock child elements to the sides or the center of the layout.

`<DockLayout>` has the following behavior:

* Uses the `dock` property to dock its children to the `left`, `right`, `top`, `bottom` or center of the layout.<br/>To dock a child element to the center, it must be the **last child** of the container and you must set the `stretchLastChild` property of the parent to `true`.
* Enforces layout constraints to its children.
* Resizes its children at runtime when its size changes.

#### Examples

#### Dock to every side without stretching the last child

The following example creates a frame-like layout consisting of 4 elements, position at the 4 edges of the screen.

```html
<dockLayout stretchLastChild="false" backgroundColor="#3c495e">
  <label text="left" dock="left" width="40" backgroundColor="#4383b8"/>
  <label text="top" dock="top" height="40" backgroundColor="#286290"/>
  <label text="right" dock="right" width="40" backgroundColor="#4383b8"/>
  <label text="bottom" dock="bottom" height="40" backgroundColor="#286290"/>
</dockLayout>
```
<img width=320 src="/media/docs/layouts/dock_layout_no_stretch.svg" />

#### Dock to every side and stretch the last child

The following example shows how `stretchLastChild` affects the positioning of child elements in a `DockLayout` container. The last child (`bottom`) is stretched to take up all the remaining space after positioning the first three elements.

```html
<dockLayout stretchLastChild="true" backgroundColor="#3c495e">
  <label text="left" dock="left" width="40" backgroundColor="#4383b8"/>
  <label text="top" dock="top" height="40" backgroundColor="#286290"/>
  <label text="right" dock="right" width="40" backgroundColor="#4383b8"/>
  <label text="bottom" dock="bottom" backgroundColor="#1c486b"/>
</dockLayout>
```
<img width=320 src="/media/docs/layouts/dock_layout_stretch.svg" />

#### Dock to every side and the center

The following example creates a `<dockLayout>` of 5 elements. The first four wrap the center element in a frame.

```html
<dockLayout stretchLastChild="true" backgroundColor="#3c495e">
  <label text="left" dock="left" width="40" backgroundColor="#4383b8"/>
  <label text="top" dock="top" height="40" backgroundColor="#286290"/>
  <label text="right" dock="right" width="40" backgroundColor="#4383b8"/>
  <label text="bottom" dock="bottom" height="40" backgroundColor="#286290"/>
  <label text="center" backgroundColor="#1c486b" />
</dockLayout>
```
<img width=320 src="/media/docs/layouts/dock_layout_all_sides_and_stretch.svg" />

#### Dock multiple children to the same side

The following example creates a single line of 4 elements that stretch across the entire height and width of the screen.

```html
<dockLayout stretchLastChild="true" backgroundColor="#3c495e">
  <label text="left 1" dock="left" width="40" backgroundColor="#4383b8"/>
  <label text="left 2" dock="left" width="40" backgroundColor="#286290"/>
  <label text="left 3" dock="left" width="40" backgroundColor="#1c486b"/>
  <label text="last child" backgroundColor="#4383b8"/>
</dockLayout>
```
<img width=320 src="/media/docs/layouts/dock_layout_multiple_on_same_side.svg" />

#### Props

| Name | Type | Description |
|------|------|-------------|
| `stretchLastChild` | `Boolean` | Enables or disables stretching the last child to fit the remaining space.

#### Additional children props

When an element is a direct child of `<DockLayout>`, you can work with the following additional properties.

| Name | Type | Description |
|------|------|-------------|
| `dock` | `String` | Specifies which side to dock the element to.<br/>Valid values: `top`, `right`, `bottom`, or `left`.

### FlexboxLayout

`<FlexboxLayout>` is a layout container that provides a non-exact implementation of the [CSS Flexbox layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). This layout lets you arrange child components both horizontally and vertically.

#### Examples

#### Default flex layout

The following example creates a row of three equally-sized elements that span across the entire height of the screen.

```html
<flexboxLayout backgroundColor="#3c495e">
  <label text="first" width="70" backgroundColor="#4383b8"/>
  <label text="second" width="70" backgroundColor="#1c486b"/>
  <label text="third" width="70" backgroundColor="#286290"/>
</flexboxLayout>
```
<img width=320 src="/media/docs/layouts/flexbox_layout_row_stretch.svg" />

#### Column flex layout

The following example creates a column of three equally-sized elements that span across the entire width of the screen.

```html
<flexboxLayout flexDirection="column" backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#4383b8"/>
  <label text="second" height="70" backgroundColor="#1c486b"/>
  <label text="third" height="70" backgroundColor="#286290"/>
</flexboxLayout>
```
<img width=320 src="/media/docs/layouts/flexbox_layout_column_stretch.svg" />

#### Row flex layout with items aligned to `flex-start`

The following example creates a row of three items placed at the top of the screen. Items are placed in the order they were declared in.

```html
<flexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" width="70" height="70" backgroundColor="#4383b8"/>
  <label text="second" width="70" height="70" backgroundColor="#1c486b"/>
  <label text="third" width="70" height="70" backgroundColor="#286290"/>
</flexboxLayout>
```
<img width=320 src="/media/docs/layouts/flexbox_layout_row_flex-start.svg" />

#### Row flex layout with custom order

The following example creates a row of three items placed at the top of the screen. Items are placed in a customized order.

```html
<flexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" order="2" width="70" height="70" backgroundColor="#4383b8"/>
  <label text="second" order="3" width="70" height="70" backgroundColor="#1c486b"/>
  <label text="third" order="1" width="70" height="70" backgroundColor="#286290"/>
</flexboxLayout>
```
<img width=320 src="/media/docs/layouts/flexbox_layout_row_custom_order.svg" />

#### Row flex layout with wrapping

The following example creates four items with enabled line wrapping. When the row runs out of space, the container wraps the last item on a new line.

```html
<flexboxLayout flexWrap="wrap" backgroundColor="#3c495e">
  <label text="first" width="30%" backgroundColor="#4383b8"/>
  <label text="second" width="30%" backgroundColor="#1c486b"/>
  <label text="third" width="30%" backgroundColor="#286290"/>
  <label text="fourth" width="30%" backgroundColor="#286290"/>
</flexboxLayout>
```
<img width=320 src="/media/docs/layouts/flexbox_layout_wrap.svg" />

#### Column flex layout with reverse order and items with a different `alignSelf`

The following example shows how to use:

* `flexDirection` to place items in a column, starting from the bottom.
* `justifyContent` to create equal spacing between the vertically placed items.
* `alignSelf` to modify the position of items across the main axis.

```html
<flexboxLayout flexDirection="column-reverse"
               justifyContent="space-around" backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#4383b8"/>
  <label text="second" alignSelf="center" width="70" height="70" backgroundColor="#1c486b"/>
  <label text="third\nflex-end" alignSelf="flex-end" width="70" height="70" backgroundColor="#286290"/>
  <label text="fourth" height="70" backgroundColor="#286290"/>
</flexboxLayout>
```

<img width=320 src="/media/docs/layouts/flexbox_layout_column_reverse_space_around_align_self.svg" />

#### Props

| Name | Type | Description |
|------|------|-------------|
`flexDirection` | `String` | Sets the direction for placing child elements in the flexbox container.<br/>Valid values:<br/>`row` (horizontal, left to right),<br/>`row-reverse` (horizontal, right to left),<br/>`column` (vertical, top to bottom), and<br/>`column-reverse` (vertical, bottom to top).<br/>Default value: `row`.
`flexWrap` | `String` | Sets whether child elements are forced in a single line or can flow into multiple lines. If set to multiple lines, also defines the cross axis which determines the direction new lines are stacked in.<br/>Valid values:<br/>`nowrap` (single line which may cause the container to overflow),<br/>`wrap` (multiple lines, direction is defined by `flexDirection`),and<br/>`wrap-reverse` (multiple lines, opposite to the direction defined by `flexDirection`).<br/>Default value: `nowrap`.
`justifyContent` | `String` |  Sets the alignment of child elements along the main axis. You can use it to distribute leftover space when all the child elements on a line are inflexible or are flexible but have reached their maximum size. You can also use it to control the alignment of items when they overflow the line.<br/>Valid values:<br/>`flex-start` (items are packed toward the start line),<br/>`flex-end` (items are packed toward the end line),<br/>`center` (items are centered along the line),<br/>`space-between` (items are evenly distributed on the line; first item is on the start line, last item on the end line), and<br/>`space-around` (items are evenly distributed on the line with equal space around them).<br/>Default value: `flex-start`.
`alignItems` | `String` | (Android-only) Sets the alignment of child elements along the cross axis on the current line. Acts as `justifyContent` for the cross axis.<br/>Valid values:<br/>`flex-start` (cross-start margin edge of the items is placed on the cross-start line),<br/>`flex-end` (cross-end margin edge of the items is placed on the cross-end line),<br/>`center` (items are centered оn the cross axis),<br/>`baseline` (the item baselines are aligned), and<br/>`stretch` (items are stretched to fill the container but respect `min-width` and `max-width`).<br/>Default value: `stretch`.
`alignContent` | `String` | Sets how lines are aligned in the flex container on the cross axis, similar to how `justifyContent` aligns individual items within the main axis.<br/> This property has no effect when the flex container has only one line.<br/>Valid values:<br/>`flex-start` (lines are packed to the start of the container),<br/>`flex-end` (lines are packed to the end of the container),<br/>`center` (lines are packed to the center of the container),<br/>`space-between` (lines are evenly distributed; the first line is at the start of the container while the last one is at the end),<br/>`space-around` (lines are evenly distributed with equal space between them), and<br/>`stretch` (lines are stretched to take up the remaining space).<br/>Default value: `stretch`.

#### Additional children props

When an element is a direct child of `<FlexboxLayout>`, you can work with the following additional properties.

| Name | Type | Description |
|------|------|-------------|
`order` | `Number` | Sets the order in which child element appear in relation to one another.
`flexGrow` | `Number` | Indicates that the child should grow in size, if necessary. Sets how much the child will grow in proportion to the rest of the child elements in the flex container.
`flexShrink` | `Number` | Indicates that the child should shrink when the row runs out of space. Sets how much the flex item will shrink in proportion to the rest of the child elements in the flex container. When not specified, its value is set to `1`.
`alignSelf` | `String` | (Android-only) Overrides the `alignItems` value for the child.<br/>Valid values:<br/>`flex-start` (cross-start margin edge of the item is placed on the cross-start line),<br/>`flex-end` (cross-end margin edge of the item is placed on the cross-end line),<br/>`center` (item is centered on the cross axis),<br/>`baseline` (the item baselines are aligned), and<br/>`stretch` (items is stretched to fill the container but respects `min-width` and `max-width`).<br/>Default value: `stretch`.
`flexWrapBefore` | `Boolean` | When `true`, forces the item to wrap onto a new line. This property is not part of the official Flexbox specification.<br/>Default value: `false`.

### GridLayout

`<GridLayout>` is a layout container that lets you arrange its child elements in a table-like manner.

The grid consists of rows, columns, and cells. A cell can span one or more rows and one or more columns. It can contain multiple child elements which can span over multiple rows and columns, and even overlap each other.

By default, `<GridLayout>` has one column and one row. You can add columns and rows by configuring the `columns` and the `rows` properties. In these properties, you need to set the number of columns and rows and their width and height. You set the number of columns by listing their widths, separated by a comma. You set the number of rows by listing their heights, separated by a comma.

You can set a fixed size for column width and row height or you can create them in a responsive manner:

* **An absolute number:** Indicates a fixed size.
* **auto:** Makes the column as wide as its widest child or makes the row as tall as its tallest child.
* **\*:** Takes as much space as available after filling all auto and fixed size columns or rows.

#### Examples

#### Grid layout with fixed sizing

The following example creates a simple 2-by-2 grid with fixed column widths and row heights.

```html
<gridLayout columns="115, 115" rows="115, 115">
  <label text="0,0" row="0" col="0" backgroundColor="#4383b8"/>
  <label text="0,1" row="0" col="1" backgroundColor="#1c486b"/>
  <label text="1,0" row="1" col="0" backgroundColor="#286290"/>
  <label text="1,1" row="1" col="1" backgroundColor="#4383b8"/>
</gridLayout>
```

<img width=320 src="/media/docs/layouts/grid_layout.svg" />

#### Grid layout with star sizing

The following example creates a grid with responsive design, where space is alotted proportionally to child elements.

```html
<gridLayout columns="*, 2*" rows="2*, 3*" backgroundColor="#3c495e">
  <Label text="0,0" row="0" col="0" backgroundColor="#4383b8"/>
  <Label text="0,1" row="0" col="1" backgroundColor="#1c486b"/>
  <Label text="1,0" row="1" col="0" backgroundColor="#286290"/>
  <Label text="1,1" row="1" col="1" backgroundColor="#4383b8"/>
</gridLayout>
```
<img width=320 src="/media/docs/layouts/grid_layout_star_sizing.svg" />

#### Grid layout with fixed and auto sizing

The following example create a grid with one auto-sized column and one column with fixed size. Rows have a fixed height.

```html
<gridLayout columns="80, auto" rows="80, 80" backgroundColor="#3c495e">
  <label text="0,0" row="0" col="0" backgroundColor="#4383b8"/>
  <label text="0,1" row="0" col="1" backgroundColor="#1c486b"/>
  <label text="1,0" row="1" col="0" backgroundColor="#286290"/>
  <label text="1,1" row="1" col="1" backgroundColor="#4383b8"/>
</gridLayout>
```
<img width=320 src="/media/docs/layouts/grid_layout_fixed_auto.svg" />

#### Grid layout with mixed sizing and merged cells

The following example creates a complex grid with responsive design, mixed width and height settings, and some merged cells.

```html
<gridLayout columns="40, auto, *" rows="40, auto, *" backgroundColor="#3c495e">
  <label text="0,0" row="0" col="0" backgroundColor="#4383b8"/>
  <label text="0,1" row="0" col="1" colSpan="2" backgroundColor="#1c486b"/>
  <label text="1,0" row="1" col="0" rowSpan="2" backgroundColor="#286290"/>
  <label text="1,1" row="1" col="1" backgroundColor="#4383b8"/>
  <label text="1,2" row="1" col="2" backgroundColor="#286290"/>
  <label text="2,1" row="2" col="1" backgroundColor="#1c486b"/>
  <label text="2,2" row="2" col="2" backgroundColor="#4383b8"/>
</gridLayout>
```
<img width=320 src="/media/docs/layouts/grid_layout_complex.svg" />

#### Props

| Name | Type | Description |
|------|------|-------------|
`columns` | `String` | A string value representing column widths delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute column width. `auto` makes the column as wide as its widest child. `*` makes the column occupy all available horizontal space. The space is proportionally divided over all star-sized columns. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes.
`rows` | `String` | A string value representing row heights delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute row height. `auto` makes the row as tall as its tallest child. `*` makes the row occupy all available vertical space. The space is proportionally divided over all star-sized rows. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes.

#### Additional children props

When an element is a direct child of `<GridLayout>`, you can work with the following additional properties.

| Name | Type | Description |
|------|------|-------------|
`row` | `Number` | Specifies the row for this element. Combined with a `col` property, specifies the cell coordinates of the element.<br/>The first row is indicated by `0`.
`col` | `Number` | Specifies the column for the element. Combined with a `row` property, specifies the cell coordinates of the element.<br/>The first column is indicated by `0`.
`rowSpan` | `Number` | Specifies the number of rows which this element spans across.
`colSpan` | `Number` | Specifies the number of columns which this element spans across.

### StackLayout

`<stackLayout>` is a layout container that lets you stack the child elements vertically (default) or horizontally.

#### Examples

#### Default stacking

The following example creates a vertical stack of 3 equally-sized elements. Items are stretched to cover the entire width of the screen. Items are placed in the order they were declared in.

```html
<stackLayout backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#4383b8"/>
  <label text="second" height="70" backgroundColor="#286290"/>
  <label text="third" height="70" backgroundColor="#1c486b"/>
</stackLayout>
```

<img width=320 src="/media/docs/layouts/stack_layout_vertical.svg" />

#### Horizontal stacking

The following example creates a horizontal stack of 3 equally-sized elements. Items are stretched to cover the entire height of the screen. Items are placed in the order they were declared in.

```html
<stackLayout orientation="horizontal" backgroundColor="#3c495e">
  <label text="first" width="70" backgroundColor="#4383b8"/>
  <label text="second" width="70" backgroundColor="#286290"/>
  <label text="third" width="70" backgroundColor="#1c486b"/>
</stackLayout>
```
<img width=320 src="/media/docs/layouts/stack_layout_horizontal.svg" />

#### Stack layout with horizontally aligned children

The following example creates a diagonal stack of items with responsive sizes. Items are vertically stacked.

```html
<stackLayout backgroundColor="#3c495e">
  <label text="left" horizontalAlignment="left"
         width="33%" height="70" backgroundColor="#4383b8"/>
  <label text="center" horizontalAlignment="center"
         width="33%" height="70" backgroundColor="#286290"/>
  <label text="right" horizontalAlignment="right"
         width="33%" height="70" backgroundColor="#1c486b"/>
  <label text="stretch" horizontalAlignment="stretch"
         height="70" backgroundColor="#4383b8"/>
</stackLayout>
```

<img width=320 src="/media/docs/layouts/stack_layout_vertical_align_children.svg" />

#### Horizontal stack layout with vertically aligned children

The following example creates a diagonal stack of items with responsive sizes. Items are horizontally stacked.

```html
<stackLayout orientation="horizontal" backgroundColor="#3c495e">
  <label text="top" verticalAlignment="top"
         width="70" height="33%" backgroundColor="#4383b8"/>
  <label text="center" verticalAlignment="center"
         width="70" height="33%" backgroundColor="#286290"/>
  <label text="bottom" verticalAlignment="bottom"
         width="70" height="33%" backgroundColor="#1c486b"/>
  <label text="stretch" verticalAlignment="stretch"
         width="70" backgroundColor="#4383b8"/>
</stackLayout>
```

<img width=320 src="/media/docs/layouts/stack_layout_horizontal_align_children.svg" />

#### Props

| Name | Type | Description |
|------|------|-------------|
`orientation` | `String` | Specifies the stacking direction.<br/>Valid values: `vertical` and `horizontal`.<br/>Default value: `vertical`.

### WrapLayout

`<WrapLayout>` is a layout container that lets you position items in rows or columns, based on the `orientation` property. When the space is filled, the container automatically wraps items onto a new row or column.

#### Examples

#### Default wrap layout

The following example creates a row of equally-sized items. When the row runs out of space, the container wraps the last item on a new row.

```html
<wrapLayout backgroundColor="#3c495e">
  <label text="first" width="30%" height="30%" backgroundColor="#4383b8"/>
  <label text="second" width="30%" height="30%" backgroundColor="#1c486b"/>
  <label text="third" width="30%" height="30%" backgroundColor="#286290"/>
  <label text="fourth" width="30%" height="30%" backgroundColor="#286290"/>
</wrapLayout>
```

<img width=320 src="/media/docs/layouts/wrap_layout_horizontal.svg" />

#### Vertical wrap layout

The following example creates a column of equally-sized items. When the row runs out of space, the container wraps the last item on a new column.

```html
<wrapLayout orientation="vertical" backgroundColor="#3c495e">
  <label text="first" width="30%" height="30%" backgroundColor="#4383b8"/>
  <label text="second" width="30%" height="30%" backgroundColor="#1c486b"/>
  <label text="third" width="30%" height="30%" backgroundColor="#286290"/>
  <label text="fourth" width="30%" height="30%" backgroundColor="#286290"/>
</wrapLayout>
```

<img width=320 src="/media/docs/layouts/wrap_layout_vertical.svg" />

#### Props

| Name | Type | Description |
|------|------|-------------|
`orientation` | `String` | Specifies the stacking direction.<br/>Valid values: `horizontal` (arranges items in rows) and `vertical` (arranges items in columns).<br/>Default value: `horizontal`.
`itemWidth` | `Number` | Sets the width used to measure and layout each child.<br/>Default value: `Number.NaN`, which does not restrict children.
`itemHeight` | `Number` | Sets the height used to measure and layout each child.<br/>Default value is `Number.NaN`, which does not restrict children.
