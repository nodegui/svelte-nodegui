# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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