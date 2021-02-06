# NodeGui

[![Join the NodeGUI community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/nodegui)
[![Join the Svelte community on Discord](https://img.shields.io/discord/457912077277855764?label=chat&logo=discord)](https://svelte.dev/chat)
[![All Contributors](https://img.shields.io/badge/all_contributors-16-orange.svg?style=flat-square)](#contributors)
[![JS Party #96](https://img.shields.io/badge/JS%20Party-%2396-FFCD00.svg)](https://changelog.com/jsparty/96)

[![Build and Test status](https://github.com/nodegui/nodegui/workflows/.github/workflows/test.yml/badge.svg)](https://github.com/nodegui/nodegui/actions)

Build **performant**, **native** and **cross-platform** desktop applications with **Node.js** and **Svelte**.🚀

Svelte NodeGUI is powered by **Svelte** and **Qt5** 💚 which makes it CPU and memory efficient as compared to other chromium based solutions like electron. Svelte NodeGUI is essentially a Svelte renderer for [NodeGUI](https://github.com/nodegui/nodegui).

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" alt="" width="25"> If you are looking for the **React**-based version, check out: **[React NodeGUI](https://github.com/nodegui/react-nodegui)**.

<img src="https://vuejs.org/images/logo.png" alt="" width="25" /> If you are looking for the **Vue**-based version, check out: **[Vue NodeGUI](https://github.com/nodegui/vue-nodegui)**.

There is no dedicated documentation for Svelte NodeGUI yet, so please refer to the [React NodeGui](https://react.nodegui.org/) documentation website instead. Svelte NodeGUI implements exactly the same APIs as React NodeGUI – literally a copy-paste, as you'll see in [src/dom/react-nodegui](src/dom/react-nodegui) – so those docs are equally applicable.

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

-   🧬 Cross platform. Should work on major Linux flavours, Windows and MacOS.
-   📉 Low CPU and memory footprint. Current CPU stays at 0% on idle and memory usage is under 20mb for a hello world program.
-   💅 Styling with CSS (includes actual cascading). Also has full support for Flexbox layout (thanks to Yoga).
-   ✅ Complete Nodejs api support (Currently runs on Node v12.x - and is easily upgradable). Hence has access to all nodejs compatible npm modules.
-   🎪 Native widget event listener support. Supports all events available from Qt / NodeJs.
-   💸 Can be used for Commercial applications.
-   🕵️‍♂️ Good Devtools support.
-   📚 Good documentation and website.
-   🧙‍♂️ Good documentation for contributors.
-   🦹🏻‍♀️ Good support for dark mode (Thanks to Qt).
-   🏅First class Typescript support. (Works on regular JS projects too 😉).

## Getting Started

-   For now, download a zip of this repo and copying the `demo` folder is the best way to scaffold a new project.
-   Read through the [React NodeGUI docs](https://react.nodegui.org/) (there are no Svelte NodeGui docs yet, but there should be little difference).
-   Checkout the examples: https://github.com/nodegui/examples .
-   [Tutorial: Build a native Meme Search Desktop app with Javascript (NodeGUI) and Giphy API](https://www.sitepoint.com/build-native-desktop-gif-searcher-app-using-nodegui/)

## Installation

NodeGui requires CMake and Compilation Tools as it is a wrapper for a native C++ widget toolkit QT.
Detailed instructions here: https://www.sitepoint.com/build-native-desktop-gif-searcher-app-using-nodegui/

TL;DR:

### MacOS

```sh
brew install cmake
brew install make
```

### Windows

https://cmake.org/download/

### Linux (Debian/Ubuntu)

```sh
sudo apt-get install pkg-config build-essential
sudo apt-get install cmake make
sudo apt-get install mesa-common-dev libglu1-mesa-dev
```

### Linux (Fedora/RHEL/CentOS)

```sh
sudo dnf groupinstall "Development Tools" "Development Libraries"
sudo dnf groupinstall "C Development Tools and Libraries"
sudo dnf install mesa-libGL mesa-libGL-devel
```

Then install NodeGUI from your command line:

#### To install latest stable release:

```sh
# WARNING: Not yet published to npm. On the to-do list..!
npm install @nodegui/svelte-nodegui
```

#### To install the latest version available on master branch:

```sh
npm install https://github.com/nodegui/nodegui/releases/download/v0.0.0-latest-master/nodegui-master.tgz
```

or a shorter version:

```sh
npm i http://master-release.nodegui.org
```

If the installation fails to download the Qt binaries, a mirror can be used by setting the following environment variable and running the install command again:

```sh
QT_LINK_MIRROR=<alternative domain> # eg. QT_LINK_MIRROR=https://qt-mirror.dannhauer.de

npm install @nodegui/svelte-nodegui
```

See [FAQs](https://github.com/nodegui/nodegui/tree/master/website/docs/faq.md#why-does-installation-fail-at-minimal-qt-setup) for more details.

**Community guides**

-   [Tutorial: Build a native Meme Search Desktop app with Javascript (NodeGUI) and Giphy API](https://www.sitepoint.com/build-native-desktop-gif-searcher-app-using-nodegui/)
-   https://blog.logrocket.com/electron-alternatives-exploring-nodegui-and-react-nodegui/ - Electron alternatives: Exploring NodeGUI and React NodeGUI by [Siegfried Grimbeek](https://blog.logrocket.com/author/siegfriedgrimbeek/).
-   https://hibbard.eu/node-gui/ - Excellent guide from [James Hibbard](https://github.com/jameshibbard).

**Talks/Podcasts**

-   [NodeGUI and React NodeGUI at KarmaJS Nov 2019 meetup: https://www.youtube.com/watch?v=8jH5gaEEDv4](https://www.youtube.com/watch?v=8jH5gaEEDv4)

-   <audio data-theme="night" data-src="https://changelog.com/jsparty/96/embed" src="https://cdn.changelog.com/uploads/jsparty/96/js-party-96.mp3" preload="none" class="changelog-episode" controls></audio><p><a href="https://changelog.com/jsparty/96">JS Party 96: Performant Node desktop apps with NodeGUI</a> – Listen on <a href="https://changelog.com/">Changelog.com</a></p>

## Docs for contributing

### Svelte NodeGUI

File issues and get in touch, and we can guide you to something broken that needs fixing!

### NodeGUI

Looking to contribute to NodeGUI? If you wish to implement a new widget/add more features and need help understanding the codebase, you can start here: [Contributing developer docs](https://github.com/nodegui/nodegui/tree/master/website/docs/development).

Please read https://github.com/nodegui/.github/blob/master/CONTRIBUTING.md

## Building

`npm run build`

Optionally set `QT_INSTALL_DIR='/path/to/qt'` environment variable to build using your own version of Qt.

## Updating docs

`npm run docs`

then followed by:

`cd website && GIT_USER=<your_git_username> yarn deploy`

## Funding

As no funding infrastructure is in place for Svelte NodeGUI specifically, please consider supporting [NodeGUI](https://github.com/nodegui/nodegui) instead, which would be just as productive!

## Special Thanks

-   [NodeGUI logo: Thanks to Vishwas Shetty from the Noun Project.](https://github.com/nodegui/nodegui/blob/master/extras/legal/logo/thanks.md)
-   [halfnelson](https://github.com/halfnelson) for [Svelte Native](https://github.com/halfnelson/svelte-native), which Svelte NodeGUI forks (as it is an excellent example of building a custom Svelte renderer).
-   [rigor789](https://github.com/rigor789) for [NativeScript Vue Next](https://github.com/rigor789/nativescript-vue-next), from which Svelte NodeGUI takes (and adapts) its DOM implementation.
-   [a7ul](https://github.com/a7ul) for creating [NodeGUI](https://github.com/nodegui/nodegui) and unwittingly teaching me [how to build renderers](https://blog.atulr.com/react-custom-renderer-1/) in the first place.


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
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!