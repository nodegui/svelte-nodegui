# Svelte NodeGUI

> [!WARNING]
> No longer being maintained. Recommended you use the main [NodeGUI](https://github.com/nodegui/nodegui) flavour instead.

[![Join the NodeGUI community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/nodegui)
[![Join the Svelte community on Discord](https://img.shields.io/discord/457912077277855764?label=chat&logo=discord)](https://svelte.dev/chat)
[![All Contributors](https://img.shields.io/badge/all_contributors-16-orange.svg?style=flat-square)](#contributors)
[![JS Party #96](https://img.shields.io/badge/JS%20Party-%2396-FFCD00.svg)](https://changelog.com/jsparty/96)

[![Build and Test status](https://github.com/nodegui/nodegui/workflows/.github/workflows/test.yml/badge.svg)](https://github.com/nodegui/nodegui/actions)

Build **performant**, **native** and **cross-platform** desktop applications with **Node.js** and **Svelte**.🚀

Svelte NodeGUI is powered by **Svelte** and **Qt5** 💚 which makes it CPU- and memory-efficient when compared to Chromium-based solutions like Electron. Svelte NodeGUI is essentially a [Svelte](https://svelte.dev) renderer for [NodeGUI](https://github.com/nodegui/nodegui).

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" alt="" width="25"> If you are looking for the **React**-based version, check out: **[React NodeGUI](https://github.com/nodegui/react-nodegui)**.

<img src="https://vuejs.org/images/logo.png" alt="" width="25" /> If you are looking for the **Vue**-based version, check out: **[Vue NodeGUI](https://github.com/nodegui/vue-nodegui)**.

Visit: https://svelte.nodegui.org for docs.

<img alt="logo" src="https://github.com/nodegui/nodegui/raw/master/extras/logo/nodegui.png" height="200" />

## How does it look?

<div style="display:inline; margin: 0 auto;">
<img alt="demo_linux" src="https://github.com/nodegui/examples/raw/master/nodegui/calculator/calculator_linux.png" height="280" />
<img alt="demo_win" src="https://github.com/nodegui/examples/raw/master/nodegui/calculator/calculator_win.jpg" height="280" />
<img alt="demo_mac" src="https://github.com/nodegui/examples/raw/master/nodegui/calculator/calculator_mac.png" height="280" />
</div>

<div style="display:inline; margin: 0 auto;"><img alt="kitchen" src="https://github.com/nodegui/nodegui/raw/master/extras/assets/kitchen.png" height="280" /><img alt="demo_mac" src="https://github.com/nodegui/examples/raw/master/react-nodegui/weather-app-widget/weather_widget_mac.png" height="280" /><img alt="demo_win" src="https://github.com/nodegui/examples/raw/master/react-nodegui/image-view/image_view_win.jpg" height="280" />
</div>

**More screenshots?**

### More Examples:

https://github.com/nodegui/examples

---

## Features

-   🧬 Cross platform. Should work on major Linux flavours, Windows and macOS.
-   📉 Low CPU and memory footprint. Current CPU stays at 0% on idle and memory usage is under 20 MB for a Hello World program.
-   💅 Styling with CSS (includes actual cascading). Also has full support for Flexbox layout (thanks to Yoga).
-   ✅ Complete Node.js api support (Currently runs on Node v12.x - and is easily upgradable). Hence has access to all Node.js-compatible npm modules.
-   🎪 Native widget event listener support. Supports all events available from Qt / NodeJs.
-   💸 Can be used for Commercial applications.
-   🕵️‍♂️ Good Devtools support.
-   📚 Good documentation and website.
-   🧙‍♂️ Good documentation for contributors.
-   🦹🏻‍♀️ Good support for dark mode (Thanks to Qt).
-   🏅 First class TypeScript support. (Works on regular JS projects too 😉).

## Getting Started

-   Check out [svelte-nodegui-starter](https://github.com/nodegui/svelte-nodegui-starter) to get up and running with your own Svelte NodeGUI app!
-   Read through the [Svelte NodeGUI docs](https://svelte.nodegui.org/)
-   Check out the examples: https://github.com/nodegui/examples.
-   [Tutorial: Build a native Meme Search Desktop app with Javascript (NodeGUI) and Giphy API](https://www.sitepoint.com/build-native-desktop-gif-searcher-app-using-nodegui/)

## Docs for contributing

### Svelte NodeGUI

File issues and get in touch (e.g. on the [Svelte Discord](https://svelte.dev/chat)'s `#nativedev` channel), and we can guide you to something broken that needs fixing!

### NodeGUI

Looking to contribute to NodeGUI? If you wish to implement a new widget/add more features and need help understanding the codebase, you can start here: [Contributing developer docs](https://github.com/nodegui/nodegui/tree/master/website/docs/development).

Please read https://github.com/nodegui/.github/blob/master/CONTRIBUTING.md

## Building

```sh
npm run build
```

Optionally set `QT_INSTALL_DIR='/path/to/qt'` environment variable to build using your own version of Qt.

## Updating docs

### Generating docs from source code

The docs generation process is currently a manual operation (text edit everything yourself). The docs are a copy-paste of the React NodeGUI docs, with some text replacement. We're also carrying around a slight fork of the React NodeGUI source in the codebase. In future we hope to clean up this workflow and make it more automatable using `typedoc` just like the original React NodeGUI workflow.

### Deploying docs to GitHub Pages

```sh
cd website && GIT_USER=<your_git_username> npm run deploy
```

## Funding

As no funding infrastructure is in place for Svelte NodeGUI specifically, please consider supporting [NodeGUI](https://github.com/nodegui/nodegui) instead, which would be just as productive!

## Special Thanks

- [NodeGUI logo: Thanks to Vishwas Shetty from the Noun Project.](https://github.com/nodegui/nodegui/blob/master/extras/legal/logo/thanks.md)
- [halfnelson](https://github.com/halfnelson) for [Svelte Native](https://github.com/halfnelson/svelte-native), which Svelte NodeGUI forks (as it is an excellent example of building a custom Svelte renderer).
- [rigor789](https://github.com/rigor789) for [NativeScript Vue Next](https://github.com/rigor789/nativescript-vue-next), from which Svelte NodeGUI takes (and adapts) its DOM implementation.
- [a7ul](https://github.com/a7ul) for creating [NodeGUI](https://github.com/nodegui/nodegui) and unwittingly teaching me [how to build renderers](https://blog.atulr.com/react-custom-renderer-1/) in the first place.


## Code of Conduct

https://github.com/nodegui/.github/blob/master/CODE_OF_CONDUCT.md

## License

MIT

## Maintainers ✨

People maintaining this project.

<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/LinguaBrowse"><img src="https://avatars.githubusercontent.com/u/14055146?v=4" width="100px;" alt="Jamie Birch"/><br /><sub><b>Jamie Birch</b></sub></a></td>
  </tr>
</table>


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/LinguaBrowse"><img src="https://avatars.githubusercontent.com/u/14055146?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jamie Birch</b></sub></a><br /><a href="https://github.com/nodegui/svelte-nodegui/commits?author=shirakaba" title="Code">💻</a></td>
    <td align="center"><a href="https://mrsauravsahu.github.io"><img src="https://avatars.githubusercontent.com/u/9134050?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Saurav Sahu</b></sub></a><br /><a href="https://github.com/nodegui/svelte-nodegui/commits?author=mrsauravsahu" title="Code">💻</a></td>
    <td align="center"><a href="http://matthieu.perreira.net"><img src="https://avatars.githubusercontent.com/u/4592373?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matthieu PERREIRA DA SILVA</b></sub></a><br /><a href="https://github.com/nodegui/svelte-nodegui/commits?author=mperreir" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jonasgrunert"><img src="https://avatars.githubusercontent.com/u/22677197?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonas Grunert</b></sub></a><br /><a href="https://github.com/nodegui/svelte-nodegui/commits?author=jonasgrunert" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/LukeyBeachBoy"><img src="https://avatars.githubusercontent.com/u/26151787?v=4?s=100" width="100px;" alt=""/><br /><sub><b>LukeyBeachBoy</b></sub></a><br /><a href="https://github.com/nodegui/svelte-nodegui/commits?author=LukeyBeachBoy" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
