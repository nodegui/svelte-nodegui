---
sidebar_label: Handle Events
title: Handle Events
---

Svelte NodeGui allows you to listen to various events that might originate from the underlying Qt widgets. These events can either be a simple button click or a text change on a LineEdit or even something like window being hidden and shown.

In order to do this we need to attach an event listener to the respective widget.

Technically, the event listener is a NodeJs [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) instance that listens to events from the underlying Qt widget. The native Qt widget would send all the events to the event emitter in Svelte NodeGui world and the user can essentially subscribe to it.

Lets see an example to see how this looks in practice.

## Event handling

The following example demonstrates how to add a clicked event listener to a button widget.

<img src="https://github.com/nodegui/react-nodegui/releases/download/assets/events-react.gif" alt="event example" style={{width: '100%', maxWidth: 400}}/>

```html
<script lang="ts">
  import { onMount } from "svelte";
  let win;

  function onClicked(checked){
    console.log("the button was clicked", checked);
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
    <button on:clicked={onClicked} text="Click me"/>
</window>
```

The [`on:` directive](https://svelte.dev/docs#on_component_event) accepts an event name (e.g. "clicked") and a corresponding event handler function.

Internally, Qt widgets in nodegui has two types of events:

- Signals: In short these are basically different for different widgets. So a button may have `clicked` and `pressed` signals, while a LineEdit may have, say, the `textChanged` signal.
- QEvents: These are common set of events for all the widgets/qobjects in NodeGui world. These are also helpful at times but typically you would end up using signals more than these common events.

In Svelte NodeGui you can listen to both Signals and QEvents using the same `on:` directive.

<!-- ### useEventHandler hook and typescript support

Although you can pass in an object with event handlers to the `on:` directive, its not the most efficient way. This is because everytime the render is called the `on:` directive will get a new object meaning the widget will re-render every time. To solve for this we have `useEventHandler` hook.

```ts
import React from "react";
import {
  Renderer,
  Button,
  Window,
  useEventHandler
} from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";

const App = () => {
  const buttonHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        console.log("the button was clicked");
      },
      pressed: () => {
        console.log("button was pressed");
      },
      objectNameChanged: objectName => {
        console.log("new object name", objectName);
      }
    },
    []
  );

  return (
    <Window>
      <Button text={"Click me"} on={buttonHandler} />
    </Window>
  );
};

Renderer.render(<App />);
```

In a nutshell, the above code uses the `useEventHandler` hook which is a wrapper over `useMemo`.
This means, the buttonHandler remains same on every render call and hence the `on:` directive to Button doesnt change.

Here `objectNameChanged` is a QEvent while `clicked` and `pressed` are signals. As an app developer it really doesnt mean much but internally they are both two different things in Qt and Svelte NodeGui allows you to use both of them using a single familiar `on:` directive.

Also, another point you see in this typescript code is the QPushButtonSignals. The QPushButtonSignals is a type that allows autocompletion of event handlers as you type them. -->

### How do I know which events are supported ?

In order to find all the supported events for a widget you can take a look at

#### All Signals for the widgets:

- [https://docs.nodegui.org/docs/api/generated/globals/#interfaces](https://docs.nodegui.org/docs/api/generated/globals/#interfaces)
- [https://docs.nodegui.org/docs/api/generated/globals/#type-aliases](https://docs.nodegui.org/docs/api/generated/globals/#type-aliases)

<!-- You can subscribe to a signal like so:

```ts
import React from "react";
import {
  Renderer,
  Button,
  Window,
  useEventHandler
} from "@nodegui/react-nodegui";
import { QPushButtonSignals } from "@nodegui/nodegui";

const App = () => {
  const buttonHandler = useEventHandler<QPushButtonSignals>(
    {
      clicked: () => {
        console.log("the button was clicked");
      }
    },
    []
  );

  return (
    <Window>
      <Button text={"Click me"} on={buttonHandler} />
    </Window>
  );
};

Renderer.render(<App />);
```

The value you receive in the callback depends on the signal. Refer to respective signal docs for more details. All the handlers are also typed. So if you are using typescript you should get correct autocomplete for it. -->

#### All common QEvents for the widgets

In nodegui all these common QEvents are represented under an enum type: [WidgetEventTypes](https://docs.nodegui.org/docs/api/generated/enums/widgeteventtypes)

You can subscribe to a QEvent like so:

```html
<script lang="ts">
  import { onMount } from "svelte";
  import { QLabelSignals, QMouseEvent, WidgetEventTypes } from "@nodegui/nodegui";
  let win;

  function onMouseMove(checked){
    const mouseEvt = new QMouseEvent(nativeEvt);
    console.log("mouseMoved at: ", { x: mouseEvt.x(), y: mouseEvt.y() });
  }
  function onMouseButtonPress(checked){
    console.log("mouse button was pressed");
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
    <!-- See the WidgetEventTypes interface for the names of all supported events. -->
    <text
      mouseTracking={true}
      on:MouseMove={onMouseMove}
      on:MouseButtonPress={onMouseButtonPress}
    >
      Move your mouse here
    </text>
</window>
```

<img src="https://github.com/nodegui/react-nodegui/releases/download/assets/qevents.gif" alt="qevent example" style={{width: '100%', maxWidth: 400}}/>

Note here that every QEvent handler gives a reference to native QEvent in the handler callback.
Not all native QEvent wrappers are implemented yet and we might need your help regarding those. Feel free to jump in and contribute to the nodegui core.

Also you can specify the QEvent type as a regular `MouseMove` string or use it directly from the enum `WidgetEventTypes.MouseMove`. They both achieve same things.
