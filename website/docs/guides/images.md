---
sidebar_label: Images
title: Images
---

Images are very important for making your app more interesting.

In Svelte NodeGui, `<image>` is used to display an image.

Internally Image is a QLabel. QLabel is typically used for displaying text, but it can also display an image.
What this means is that you can pass all the props you pass to a `<text>` to `<image>` also.

A very minimal example would look like this:

```html
<script lang="ts">
  import { onMount } from "svelte";
  import { QLabelSignals, QMouseEvent, WidgetEventTypes } from "@nodegui/nodegui";
  let win;

  onMount(() => {
    (window as any).win = win; // Prevent garbage collection.
    win.nativeView.show();
    return () => {
      delete (window as any).win;
    };
  });
</script>

<window bind:this={win}>
    <image src="https://docs.nodegui.org/img/logo-circle.png" />
</window>
```

Here,

- Image is a native QLabel component that sets the image as its pixmap.

The result would look like this:

<img src="https://github.com/nodegui/react-nodegui/releases/download/assets/images.png" alt="image example" style={{width: '100%', maxWidth: 400}}/>

## Some tips

### Showing large images

The above examples wont allow you to show a huge image without either cutting it off or making the widget huge.

In order to do that:

- You can create the image instance using `<image>`
- Set the image instance as a child to a `<scrollArea>`

### Animated images

In order to use animated images, instead of `<image>` use `<animatedImage>`

### Loading an image from a buffer

Lets say we want to load an image from a buffer. In this case we can't use the `src` prop since its only reserved for local file system path or urls.

In this case use the `buffer` prop.
