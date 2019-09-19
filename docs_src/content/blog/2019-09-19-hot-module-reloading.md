---
title: Svelte Native Hot Module Reloading
description: Trying out experimental hot module reloading in Svelte Native
pubdate: 2019-09-19
author: Halfnelson
authorURL: https://twitter.com/halfnelson_au/
---

An awesome member of the Svelte community (https://github.com/rixo) has implemented preliminary support for hot module reloading in Svelte. This is a quick guide on how to set it up in your Svelte Native project

### Start with a Svelte Native Project

Use an existing one or start a new one by following the [Getting Started Guide](/blog/svelte-native-quick-start)

### Change svelte-loader to use Rixo's Fork

Edit `package.json` and replace 
```json
    "svelte-loader": "github:halfnelson/svelte-loader#fix-virtual-purge",
```

with

```json
    "svelte-loader": "github:rixo/svelte-loader#hmr",
```

### Enable the hmr option in webpack

Edit `webpack.config.js` and replace 

```json
   {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'svelte-loader',
                options: {
                    preprocess: svelteNativePreprocessor()
                }
            }
        ]
    }
```

with

```json
   {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'svelte-loader',
                options: {
                    preprocess: svelteNativePreprocessor(),
                    hotReload: true,
                    hotOptions: {
                        native: true
                    }
                }
            }
        ]
    }
```

### Take it for a test toast

That should be it. Fire up your app with 

```bash
tns run android
```

and make a change and watch it update.

![HMR in action](/media/svelte-hmr-2.gif)



