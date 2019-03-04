---
title: Your First App
---

### The Goal

Sometimes it can be easier to learn something if you have a goal to work towards. In this section we will build a Todo app with Svelte Native. It will have the following functionality:

* Basic design
  * Two-tab layout
  * One tab shows active tasks and lets you add new tasks
  * Second tab lists completed tasks
* Basic functionality
  * Add tasks: Users can add tasks as text
  * View tasks: Newly added tasks are listed as active and can be tapped
  * Complete tasks: Tapping an active task shows an action dialog with options
  * Delete tasks: Tapping an active or completed task shows an action dialog with options
* Advanced design
  * Input and button for adding tasks are styled
  * Tabs are styled
  * Active tasks are styled
  * Completed tasks are styled

![TodoApp](/media/nativescript-svelte-todo.gif)


### Prerequisites

Before you start, please ensure you have at least followed the [Quick Start Guide](#quick-start) and can get an application to run on your mobile device or emulator.

This guide assumes a existing familiarity with the Svelte framework. Run through [Svelte's excellent tutorial](https://v3.svelte.technology/tutorial) to get up to speed.

### Basic Design

We will start our from a fresh app template:

```bash
$ degit halfnelson/svelte-native-template todoapp
$ cd todoapp
$ npm install
```

Remove the default `.btn` rule from `app.css` and set the contents of App.svelte to:

```html
<!--{ filename: 'App.svelte' }-->
<page class="page">
    <actionBar title="My Tasks" class="action-bar" />
    
    <tabView height="100%" androidTabsPosition="bottom">

      <tabViewItem title="To Do" textWrap="true">
        <label>
            This tab will list active tasks and will let users add new tasks.
        </label>
      </tabViewItem>
      
      <tabViewItem title="Completed">
        <label text="This tab will list completed tasks for tracking." textWrap="true" />
      </tabViewItem>

    </tabView>
</page>
```
 > **NOTE** Notice that all tags start with a lower case letter. This is different to other NativeScript implementations. The lower case letter lets the Svelte compiler know that these are NativeScript views and not Svelte components. Think of `<page>` and `<actionBar>` as just another set of application building blocks like `<ul>` and `<div>`.

#### What's all that then?

The `<page>` element is the top-level user interface element of every Svelte-Native app. All other user interface elements are nested within.

The `<actionBar>` element shows an action bar for the `<page>`. A `<page>` cannot contain more than one `<actionBar>`.

Typically, after the `<actionBar>`, you will have navigation components (such as a drawer or a tab view) or layout components. These elements control the layout of your app and let you determine how to place other user interface elements inside.

The class names on `page` and `actionBar` are to help with styling, the default stylesheet includes a reference to the NativeScript core theme. More information on the core theme can be found in the [Nativescript Docs](https://docs.nativescript.org/ui/theme)

The `<label>` tags have been used differently. One has the `text=` attribute, while the other has the text between the opening and closing tags. Plain text between tags will be automatically assigned to the `text` attribute of the tag.

#### Progress So Far

<img src="/media/todoapp/todo-basic-design-1.png" alt="tab 1" width=300> <img src="/media/todoapp/todo-basic-design-2.png" alt="tab 2" width=300>


### Basic Functionality: Add Tasks

We have our basic design, lets allow the user to add some tasks.

Replace the contents of the first `<tabViewItem>` with:

```html
<stackLayout orientation="vertical" width="100%" height="100%">
    <gridLayout columns="2*,*" rows="*" width="100%" height="25%">
        <!-- Configures the text field and ensures that pressing Return on the keyboard 
             produces the same result as tapping the button. -->
        <textField col="0" row="0" bind:text="{textFieldValue}" hint="Type new task..." editable="true"
            on:returnPress="{onButtonTap}" />
        <button col="1" row="0" text="Add task" on:tap="{onButtonTap}" />
    </gridLayout>

    <listView class="list-group" items="{todos}" on:itemTap="{onItemTap}" style="height:75%">
        <Template let:item>
            <label text="{item.name}" class="list-group-item-heading" textWrap="true" />
        </Template>
    </listView>
</stackLayout>
```

and to the bottom of the file add a script tag:
```html
<script>
    import { Template } from 'svelte-native/components'
    
    let todos = []
    let textFieldValue = ""

    function onItemTap(args) {
      console.log('Item with index: ' + args.index + ' tapped');
    }

    function onButtonTap() {
      if (textFieldValue === "") return; // Prevents users from entering an empty string.
      console.log("New task added: " + textFieldValue + "."); // Logs the newly added task in the console for debugging.
      todos = [{ name: textFieldValue }, ...todos] // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
      textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    }
</script>
```

#### What did we just do?

To allow the user to enter a todo item, we need to capture the name of the task. We did this by adding a `<textField>`. A `<button>` was added to submit the task and a `<listView>` to display the task.

Since this functionality required adding 3 elements to the tabview, we use layouts to tell NativeScript where to place each item. `<stackLayout>` places items in a row either vertical or horizontal. We used it to place our input form above the `<listView>`. `<gridView>` is used to layout items in a predefined grid. It is used to place the `<button>` to the right and take up half the space of the `<textInput>`.

The `<listView>` contains a `<Template>` which is a Svelte component used to render each item. The template component needs to be imported just like all Svelte components.

When `onButtonTap` callback is fired, the code we added to the script element, will build a new `todos` array including the added item, and clear the text field. The `onItemTap` callback will just log which list item index was tapped using `console.log` which works fine in NativeScript.

> **NOTE** `<listView>` will look for the first `<Template>` component in its children. The template component acts similar to a slot and will render its content for each item. This is exposed to the content as `item` via the `let:item` on the template element.

#### Progress So Far

<img alt="We can add items" src="/media/todoapp/todo-add-item.png" width=350>

It isn't pretty, but it works!

