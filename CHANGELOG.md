# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.4]
  - Only include children that set the same property on parent when calculating index.

## [0.9.3]
  - Fix regression in attribute setter logic

## [0.9.2]
  - Test harness is working again
  - Fixed regression for tabstrip item removal
  - Resolved more property names

## [0.9.1]
  - Nativescript 7 support
  - Resolve [Object object] in listview when using itemTemplateSelector

## [0.8.5]
  - Resolve Formatted string reactivity [#166](https://github.com/halfnelson/svelte-native/issues/166)
  - Prevent resolving of log messages when trace is not enabled

## [0.8.4]
  - Remove calls to deprecated "topmost()"


## [0.8.3]
  - Fix animations by overwriting NativeScripts slightly non-compliant requestAnimationFrame
  - Fix slide animation

## [0.8.2]
  - Fix event bubbling with less monkey patching.
  
## [0.8.1]
  - Fix event bubbling [#124](https://github.com/halfnelson/svelte-native/issues/124)


## [0.8.0]
  - Fix bug in segmented bar (re)creation closes [#118](https://github.com/halfnelson/svelte-native/issues/118) and [#119](https://github.com/halfnelson/svelte-native/issues/119)
  - Correctly handle multiple child text nodes
  - Added ability to override nativescript tags with your own. Closes [#105](https://github.com/halfnelson/svelte-native/issues/105) 
  - Swap to @nativescript/core from tns-core-modules. Closes [#103](https://github.com/halfnelson/svelte-native/issues/103) 
  - Internal logger now skips evaluation of template strings when logging is disabled
  - Upgrade to nativescript 6.4
  - Upgrade to svelte 3.19.*
  

## [0.7.3]
  - provide timestamp to requestAnimationFrame shim,fixes transition problems with svelte 3.16+


## [0.7.2]
  - use most recent patch of svelte and tns-core-modules instead of most recent minor, this should help prevent breakages by upstream dependencies
  - Require svelte 3.16.*
  - Detect nativescripts own requestAnimationFrame polyfill and don't try to overwrite
  

## [0.7.1]
  - Fix Tabs component rendering on iOS
  - Fix Tabs component on start page crashes app on iOS

## [0.7.0]
  - Support for Nativescript 6.2
  - Clear history when frame direct child change causes a navigation, closes [#96](https://github.com/halfnelson/svelte-native/issues/96)

## [0.6.1]
  - Restored custom TabStrip element implementation to work around [problem with tabstripitem view creation](https://github.com/NativeScript/NativeScript/issues/7608)

## [0.6.0]

### Breaking Changes
  - Renamed NativeElementNode to NativeViewElementNode and added a parent class NativeElementNode which handles nativescript entities not derived from View
  - Removed "meta" legacy onInsert and Remove hook container

### Added
  - support for `prop:` directive to set the value of the containing node to the nativeView of the current node e.g `<gridLayout prop:mainContent>` for sideDrawer
  - Added a parameter to NativeElementNode that configures the prop: behaviour and defines the correct casing of any property
  - Added a parameter `setsParentProp` to NativeElementNode that specifies a property on the perent node to set to constructed element when inserted.
  - Added registerNativeViewElement and registerNativeConfigElement exports. These help change:
```
  registerElement('myTag', () => new NativeViewElementNode('myTag', require('some-tns-plugin/mytag').MyTag))
```
into
```
  registerNativeViewElement('myTag', () => require('some-tns-plugin/mytag').MyTag )
```
  - Added `svelteNativeNoFrame` which allows you to launch your app without an implicit root frame. Great for when you are using RadSidebar


### Changes
  - Refactored property name normalization to cache based on object prototype so we aren't walking all defined properties every time we get or set.
  - Use the new 'scoped styles' boolean parameter when calling addCss if we don't detect any :global() styles. This should improve perf.
  
  
## [0.5.3]
  - Add support for itemTemplateSelector closes [#86](https://github.com/halfnelson/svelte-native/issues/86)

## [0.5.2]
  - Fix frame not found by Id [#82](https://github.com/halfnelson/svelte-native/issues/82)

## [0.5.1]
  - Fix animations when using latest svelte

## [0.5.0]
  - Updated to [NativeScript 6.1](https://www.nativescript.org/blog/nativescript-6.1-kotlin-support-is-here)
  - Support Tabs, TabStrip, and Bottom Navigation components

## [0.4.3]
  - Support sveltes new dev document.dispatch calls
  - Update to svelte 3.12.1

## [0.4.2]
  - Update to svelte 3.7.1 and add workaround for https://github.com/sveltejs/svelte/issues/3364

## [0.4.1]
  - Pin against svelte 3.6.1 to resolve #44 while waiting for https://github.com/sveltejs/svelte/issues/3354

## [0.4.0] - 
  - Built against latest svelte 3.6.7 and Nativescript 6.0

## [0.3.4] - 2019-06-15
  - ListItem template components are now created with `intro: true`

## [0.3.3] - 2019-05-22

### Fixed
  - mounting with anchor uses correct index during insert (fixes #30)

## [0.3.2] - 2019-05-16

### Fixed
  - class: directives now work with falsy values

### Changed
  - Bumped Nativescript to 5.4
  - Bumped Svelte to 3.4
  - Updated unit tests to use bundled svelte components instead of compiling as part of test.

## [0.3.1] - 2019-04-30

### Added
  - Removed console log spam and added to a NativeScript trace category exported as `DomTraceCategory`

## [0.3.0] - 2019-04-23

### Added
 - Introduced a Changelog

### Changed
 - Bumped versions to use freshly released Svelte 3.0.0
