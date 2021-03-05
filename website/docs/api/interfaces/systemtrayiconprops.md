---
id: "systemtrayiconprops"
title: "SystemTrayIconProps"
sidebar_label: "SystemTrayIconProps"
---

The SystemTrayIcon component provides the ability to add and manipulate a native system tray icon.
[NodeGui's QSystemTrayIcon](https://docs.nodegui.org/docs/api/generated/classes/qsystemtrayicon).
## Example

```html
<script lang="ts">
  import { onMount } from "svelte";
  import { QIcon, QAction } from "@nodegui/nodegui";
  import path from "path";

  onMount(() => {
    (window as any).win = win; // Prevent garbage collection.
    win.nativeView.show();

    const icon = new QIcon(path.join(__dirname, "../extras/assets/nodegui.png"));
    const action = new QAction();
    action.setText("Hello");
    function onTriggered(){
      console.log("hello");
    }
    action.addEventListener("triggered", onTriggered);

    return () => {
      action.removeEventListener("triggered", onTriggered);
      delete (window as any).win;
    };
  });
</script>

<window bind:this={win}>
  <systemTrayIcon {icon} tooltip="Hello World" visible>
    <menu actions={[action]}/>
  </systemTrayIcon>
</window>
```

## Hierarchy

* RNProps

  ↳ **SystemTrayIconProps**

## Index

### Properties

* [icon](systemtrayiconprops.md#optional-icon)
* [id](systemtrayiconprops.md#optional-id)
* [on](systemtrayiconprops.md#optional-on)
* [tooltip](systemtrayiconprops.md#optional-tooltip)
* [visible](systemtrayiconprops.md#optional-visible)

## Properties

### `Optional` icon

• **icon**? : *QIcon*

Sets an icon for the system tray. [QSystemTrayIcon: setIcon](https://docs.nodegui.org/docs/api/generated/classes/qsystemtrayicon#seticon)

___

### `Optional` id

• **id**? : *undefined | string*

Sets the object name (id) of the widget in Qt. Object name can be analogous to id of an element in the web world. Using the objectName of the widget one can reference it in the Qt's stylesheet much like what we do with id in the web world. [QWidget: setObjectName](https://docs.nodegui.org/docs/api/NodeWidget#widgetsetobjectnameobjectname)

___

### `Optional` on

• **on**? : *Partial‹[WidgetEventListeners](../globals.md#widgeteventlisteners) | QSystemTrayIconSignals›*

Prop to set the event listener map. See [Handlong Events](/docs/guides/handle-events)

___

### `Optional` tooltip

• **tooltip**? : *undefined | string*

Sets a tooltip for the system tray. [QSystemTrayIcon: setTooltip](https://docs.nodegui.org/docs/api/generated/classes/qsystemtrayicon#settooltip)

___

### `Optional` visible

• **visible**? : *undefined | false | true*

Shows or hides the widget and its children. [QWidget: show](https://docs.nodegui.org/docs/api/NodeWidget#widgetshow)
