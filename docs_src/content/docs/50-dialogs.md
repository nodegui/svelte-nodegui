---
title: Dialogs
---

### ActionDialog

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#action">Class Docs</a></div>

The `action()` method shows a list of selectable options and a cancellation button. Use it to let the user choose between options or dismiss the selection.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

#### Basic use

```js
import { action } from '@nativescript/core/ui/dialogs'

action('Your message', 'Cancel button text',  ['Option1', 'Option2'])
  .then(result => {
    console.log(result)
  })
```

### AlertDialog

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#alert">Class Docs</a></div>

The `alert()` method shows a message and an OK button. Use it to show information and notifications that do not require an action from the user.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

#### Basic use

```js
import { alert } from '@nativescript/core/ui/dialogs'

alert('Your message')
  .then(() => {
    console.log("Alert dialog closed.")
  })
```

#### Configure dialog options

```js
alert({
  title: "Your title",
  message: "Your message",
  okButtonText: "Your OK button text"
}).then(() => {
  console.log("Alert dialog closed")
})
```

### ConfirmDialog

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#confirm">Class Docs</a></div>

The `confirm()` method shows a confirmation message and Cancel and OK buttons.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

#### Basic use

```js

import { confirm } from '@nativescript/core/ui/dialogs'

confirm('Your message')
  .then(res => {
    console.log(res)
  })
```

#### Configure dialog options

```js
confirm({
  title: "Your title",
  message: "Your message",
  okButtonText: "Your OK button text",
  cancelButtonText: "Your Cancel text"
}).then(res => {
  console.log(res)
})
```

### LoginDialog

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#login">Class Docs</a></div>

The `login()` method shows a dialog where the user can provide login credentials.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

#### Basic use

```js
import { login } from '@nativescript/core/ui/dialogs'

login("Your message", "Username field value", "Password field value")
  .then(res => {
    console.log(`Dialog result: ${res.result}, user: ${res.userName}, pwd: ${res.password}`)
  })
```

#### Configure dialog options

```js
login({
  title: "Your login title",
  message: "Your login message",
  okButtonText: "Your OK button text",
  cancelButtonText: "Your Cancel button text",
  userName: "Username field value",
  password: "Password field value"
}).then(res => {
  console.log(`Dialog result: ${res.result}, user: ${res.userName}, pwd: ${res.password}`)
})
```

### PromptDialog

<div class="nsref"><a title="NativeScript Documentation" href="https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#prompt">Class Docs</a></div>

The `prompt()` method shows a dialog with a single-line field for user input.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

#### Basic use

```js
import { prompt } from '@nativescript/core/ui/dialogs'

prompt('Your message to the user', 'Suggested user input')
  .then(res => {
    console.log(`Dialog result: ${res.result}, text: ${res.text}`)
  })
```

#### Configure dialog options

```js
prompt({
  title: "Your dialog title",
  message: "Your message",
  okButtonText: "Your OK button text",
  cancelButtonText: "Your Cancel button text",
  defaultText: "Suggested user input",
}).then(res => {
  console.log(`Dialog result: ${res.result}, text: ${res.text}`)
})
```

#### Configure input type

You can also configure the input type using `inputType`. You can choose between plain text (`text`), email-enabled input (`email`), and password-like hidden input (`password`), number input for numeric keyboard (`number` or `decimal`) and phone number (`phone`).

```js
inputType: inputType.text
inputType: inputType.email
inputType: inputType.password
inputType: inputType.number
inputType: inputType.decimal
inputType: inputType.phone
```

You can control the capitalization type for prompt dialog. This will control the shift behavior on the input keyboard.

```js
capitalizationType: capitalizationType.none
capitalizationType: capitalizationType.all
capitalizationType: capitalizationType.sentences
capitalizationType: capitalizationType.words
```

#### Example

```js
import { prompt, inputType } from '@nativescript/core/ui/dialogs'

prompt({
  title: "Email Prompt",
  message: "Provide your email address:",
  okButtonText: "OK",
  cancelButtonText: "Cancel",
  defaultText: "name@domain.com",
  inputType: inputType.email
}).then(res => {
  console.log(`Dialog result: ${res.result}, text: ${res.text}`)
})
```

