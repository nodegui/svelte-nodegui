---
sidebar_label: Layout
title: Layout
---

Svelte NodeGui uses a layout system to automatically arrange child components within a component to ensure that they make good use of the available space.

## Fixed Dimensions

A component's height and width determine its size on the screen. The simplest way to set the dimensions of a component is by adding a fixed width and height to style. Setting dimensions this way is common for components that should always render at exactly the same size, regardless of screen dimensions.

```html
<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    (window as any).win = win; // Prevent garbage collection.
    win.nativeView.show();
    return () => {
      delete (window as any).win;
    };
  });
</script>

<window bind:this={win}>
  <view style="width: 50px; height: 30px; background-color: yellow;"/>
</window>
```


## Dynamic Layouts

Dynamic layouts automatically position and resize components when the amount of space available for them changes, ensuring that they are consistently arranged and that the user interface as a whole remains usable.

Svelte NodeGui currently supports layouting using FlexLayout.

## FlexLayout

FlexLayout allows the children to expand and shrink dynamically based on available space. Normally you will use `flex: 1`, which tells a component to fill all available space, shared evenly amongst other components with the same parent. The larger the flex given, the higher the ratio of space a component will take compared to its siblings.

> A component can only expand to fill available space if its parent has dimensions greater than 0. If a parent does not have either a fixed width and height or flex, the parent will have dimensions of 0 and the flex children will not be visible.

Flexbox is designed to provide a consistent layout on different screen sizes. You will normally use a combination of flex-direction, align-items,and justify-content to achieve the right layout.

### Example:

Lets say you want to build a UI that has a parent view which has two child components. One a label with text Hello and another a view with background color white. Now you want the label to occupy 1/3 of the available space while the white colored child view to occupy the remaining 2/3 space.

<img src="https://github.com/nodegui/react-nodegui/raw/gh-pages/img/flex-layout-1.png" alt="flex layout example 1" style={{maxWidth: 700, width:'100%'}}/>

The code for that would look something like this:

```html
<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    (window as any).win = win; // Prevent garbage collection.
    win.nativeView.show();
    return () => {
      delete (window as any).win;
    };
  });
</script>

<window bind:this={win}>
  <view id="rootView">
    <text id="label">Hello</text>
    <view id="view"/>
  </view>
</window>

<style>
  #rootView{
    height: '100%';
    background-color: blue;
  }
  #label {
    flex: 1;
    color: white;
    background-color: green;
  }
  #view {
    flex: 3;
    background-color: white;
  }
</style>
```

> To know more on how FlexBox layout works in depth you can visit: https://facebook.github.io/react-native/docs/0.60/flexbox.
>
> NodeGui uses the same library that React Native uses underneath for FlexBox ([Yoga](https://github.com/facebook/yoga)).

- You can specify layout properties via inline styles also.


## BoxView Layout

BoxView Layout is an implementation of QBoxLayout of NodeGui.

```html
<script lang="ts">
  import { onMount } from "svelte";
  import { Direction } from "@nodegui/nodegui";
  import type { QPushButtonSignals } from "@nodegui/nodegui";

  let additionalButtons: string[] = [];
  let direction: Direction = Direction.LeftToRight;

  function addHandler(): void {
    additionalButtons = [...additionalButtons, `Button ${additionalButtons.length}`];
  }
  function removeHandler(): void {
    additionalButtons = [...additionalButtons.slice(0, additionalButtons.length - 1)];
  }
  function toggleDirection(): void {
    direction = ((direction + 1) % 4) as Direction;
  }

  onMount(() => {
    (window as any).win = win; // Prevent garbage collection.
    win.nativeView.show();
    return () => {
      delete (window as any).win;
    };
  });
</script>

<window bind:this={win}>
  <boxView direction={direction}>
    <button text="Add" on={addHandler} />
    <button text="Remove" on={removeHandler} />
    <button text="Toggle direction" on={toggleDirection} />
    {#each additionalButtons as additionalButton (additionalButton)}
      <button text={additionalButton}/>
    {/each}
  </boxView>
</window>
```

The above code produces

<img src="https://github.com/nodegui/react-nodegui/raw/gh-pages/img/box-layout-1.png" alt="box layout example 1" style={{maxWidth: 700, width:'100%'}}/>
<img src="https://github.com/nodegui/react-nodegui/raw/gh-pages/img/box-layout-2.png" alt="box layout example 1" style={{maxWidth: 700, width:'100%'}}/>


## GridView Layout

GridView Layout is an implementation of QGridLayout of NodeGui.

```html
<script lang="ts">
  import { onMount } from "svelte";
  let win;

  let additionalRows: string[] = [];
  let additionalColumns: string[] = [];
  let rowStretch: boolean = false;

  function insertRowHandler(): void {
    additionalRows = [...additionalRows, `Row ${additionalRows.length}`];
  }
  function removeRowHandler(): void {
    additionalRows = [...additionalRows.slice(0, additionalRows.length - 1)];
  }
  function insertColumnHandler(): void {
    additionalColumns = [...additionalColumns, `Column ${additionalColumns.length}`];
  }
  function removeColumnsHandler(): void {
    additionalColumns = [...additionalColumns.slice(0, additionalColumns.length - 1)];
  }
  function toggleRowStretch(): void {
    rowStretch = !rowStretch;
  }

  onMount(() => {
    (window as any).win = win; // Prevent garbage collection.
    win.nativeView.show();
    return () => {
      delete (window as any).win;
    };
  });
</script>

<window bind:this={win}>
  <gridView
    style="flex: 1"
    columnProps={{
      0: {
        minWidth: 200,
      },
      1: {
        minWidth: 300,
      },
    }}
    rowProps={{
      0: {
        stretch: rowStretch ? 2 : undefined,
        minHeight: 400,
      },
      1: {
        stretch: !rowStretch ? 2 : undefined,
      },
    }}
  >
    <gridRow>
      <gridColumn width={2}>
        <view style="background-color: red">
          <text>Hello</text>
          <button text="Insert row" on:clicked={insertRowHandler} />
          <button text="Remove row" on:clicked={removeRowHandler} />
          <button text="Toggle row stretch" on:clicked={toggleRowStretch} />
          <button text="Insert column" on:clicked={insertColumnHandler} />
          <button text="Remove column" on:clicked={removeColumnsHandler} />
        </view>
      </gridColumn>
      <gridColumn width={2}>
        <view style="background-color: blue">
          <text>Second Column</text>
        </view>
      </gridColumn>
      {#each additionalColumns as column (column)}
        <gridColumn>
          <text>{column}</text>
        </gridColumn>
      {/each}
    </gridRow>
    <gridRow height={2}>
      <gridColumn>
        <view style="background-color: green">
          <text>Second row</text>
        </view>
      </gridColumn>
      <gridColumn>
        <view style="background-color: purple">
          <text>Second Column</text>
        </view>
      </gridColumn>
      <gridColumn>
        <view style="background-color: purple">
          <text>Third Column</text>
        </view>
      </gridColumn>
      <gridColumn>
        <view style="background-color: purple">
          <text>Fourth Column</text>
        </view>
      </gridColumn>
      {#each additionalColumns as column (column)}
        <gridColumn>
          <text>Second {column}</text>
        </gridColumn>
      {/each}
    </gridRow>
    <gridRow>
      <gridColumn>
        <text>Third row</text>
      </gridColumn>
    </gridRow>
    {#each additionalRows as row (row)}
      <gridColumn>
        <gridColumn width={2}>
          <text>{row}</text>
        </gridColumn>
        <gridColumn>
          <text>Second {row}</text>
        </gridColumn>
      </gridColumn>
    {/each}
  </gridView>
</window>
```

The above code produces

<img src="https://github.com/nodegui/react-nodegui/raw/gh-pages/img/grid-layout-1.png" alt="grid layout example 1" style={{maxWidth: 700, width:'100%'}}/>


## Conclusion

The primary layout in Svelte NodeGui is the Flexbox layout. Flexbox layout can be controlled via stylesheet just as in web. So both paint and layout properties are available at the same place.
