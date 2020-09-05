import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.demo',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'full',
  },
  webpackConfigPath: './svelte-native.webpack.config.js',
  appPath: 'app',
} as NativeScriptConfig
