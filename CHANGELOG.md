# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.1]
  - Restored custom TabStrip element implementation to work around (problem with tabstripitem view creation)[https://github.com/NativeScript/NativeScript/issues/7608]

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
