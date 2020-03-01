---
title: Getting Started
---

### Quick Start

#### Install Nativescript

Svelte-Native works on top of NativeScript. To install NativeScript:

```bash
$ npm install -g nativescript
```

Check it worked by running `tns`:

![Success](/media/tns-success.png)

#### Install the NativeScript Playground app

Svelte-Native really is native, so it needs a mobile device to run. The build setup for iOS or Android can be a pain, so the wizards at Progress have created the NativeScript playground app. This allows us to run Svelte-Native application code without having to build the full mobile application.

[<img src="/media/app-store.png" alt="Get if rom the App Store">](https://itunes.apple.com/us/app/nativescript-playground/id1263543946?mt=8&amp;ls=1)
[<img src="/media/google-play.png" alt="Get it from Google Play">](https://play.google.com/store/apps/details?id=org.nativescript.play)

#### Create a new Svelte-Native app

The easiest way to get started is to use the [latest template app](https://github.com/halfnelson/svelte-native-template):

```bash
$ npx degit halfnelson/svelte-native-template myapp
```

A fresh svelte-native app will be found in the `myapp` folder.

#### Launch It

Launch your app with:

```bash
$ cd myapp
$ tns preview
```

You will need to scan the QR Code using the "Playground" app you installed previously.

<img src="/media/quick-start-screenshot.png" width=200 alt="Running App" >

### Advanced Install

To compile your apps for distribution, you will need to set up your system for local compilation.

Svelte-Native runs on top of an unmodified NativeScript platform. Installation instructions for your operating system can be found in the [Native Script Guide](https://docs.nativescript.org/start/quick-setup).

Check you have the NativeScript build environment configured correctly by using the Nativescript doctor command:

```bash
$  tns doctor
```

Once that is happy you can do a full compile and launch of your application with

```bash
$ tns run android
```

or

```bash
$ tns run ios
```


### Using Nativescript Plugins

Since Svelte Native uses unmodified NativeScript, it is possible to use NativeScript plugins, such as those found on the [marketplace](https://market.nativescript.org/).

Follow the instructions for the component and if there isn't instructions for svelte, look for the Nativescript Vue instructions involving `registerElement`. 
Register the element using `registerNativeViewElement(tagName, ()=> NativeConstructor)`

eg for [Nativescript Mapbox Plugin](https://market.nativescript.org/plugins/nativescript-mapbox)

```bash
$ tns plugin add nativescript-mapbox
```

in app.ts before app startup

```js
import { registerNativeViewElement } from 'svelte-native/dom'

registerNativeViewElement("mapBox", () => require("nativescript-mapbox").MapboxView);
```

You can now use the `<mapBox>` tag in your application following the plugin's documentation.

> **NOTE** For examples of how to register more complex components, check out the code in [svelte-native-nativescript-ui](https://github.com/halfnelson/svelte-native-nativescript-ui) which supports the Nativescript Professional UI components
