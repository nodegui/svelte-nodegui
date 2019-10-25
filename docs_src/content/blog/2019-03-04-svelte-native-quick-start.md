---
title: Svelte Native Quick Start
description: The short short version
pubdate: 2019-03-04
author: Halfnelson
authorURL: https://twitter.com/halfnelson_au/
---

Less yapping, more coding!

## Install Nativescript

Svelte-Native works on top of NativeScript. To install NativeScript:

```bash
$ npm install -g nativescript
```

Check it worked by running `tns`

![Success](/media/tns-success.png)


### Install the NativeScript Playground app

Svelte-Native really is native, so it needs a mobile device to run. The build setup for iOS or Android can be a pain, so the wizards at Progress have created the NativeScript playground app. This allows us to run Svelte-Native application code without having to build the full mobile application.


[<img src="/media/app-store.png" alt="Get if rom the App Store">](https://itunes.apple.com/us/app/nativescript-playground/id1263543946?mt=8&amp;ls=1)
[<img src="/media/google-play.png" alt="Get it from Google Play">](https://play.google.com/store/apps/details?id=org.nativescript.play)

## Create a new Svelte-Native app

The easiest way to get started is to use the [latest template app](https://github.com/halfnelson/svelte-native-template):

```bash
$ npx degit halfnelson/svelte-native-template myapp
```

A fresh svelte-native app will be found in the `myapp` folder.

## Launch It

Launch your app with:

```bash
$ cd myapp
$ tns preview --bundle
```

You will need to scan the ascii art QR code using the "Playground" app you installed previously.

![Running App](/media/quick-start-screenshot.png)

## Draw the rest of the owl

You can check out the [Grocery App Example](https://github.com/halfnelson/svelte-native-grocery) for an example of a larger application. 

Jump into the [Docs](/docs) or follow the [Tutorial](/tutorial) to get started.