module.exports = {
  title: "Svelte NodeGUI",
  tagline: "Build performant, native, cross-platform desktop apps with Svelte",
  url: "https://svelte.nodegui.org",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "nodegui", // Usually your GitHub org/user name.
  projectName: "svelte-nodegui", // Usually your repo name.
  onBrokenLinks: "warn",
  onDuplicateRoutes: "warn",
  themeConfig: {
    navbar: {
      title: "Svelte NodeGUI",
      logo: {
        alt: "NodeGui Logo",
        src: "img/logo-circle.png",
      },
      items: [
        { to: "docs/guides/getting-started", label: "Docs", position: "right" },
        {
          to: "docs/api/interfaces/buttonprops",
          label: "API",
          position: "right",
        },
        { to: "blog", label: "Blog", position: "right" },
        {
          href: "https://github.com/nodegui/svelte-nodegui",
          label: "GitHub",
          position: "right",
        },
      ],
      /**
       * Prism doesn't yet support Svelte, so Docusaurus can't highlight it.
       * @see https://github.com/PrismJS/prism/issues/2090
       * There is a community-made support layer, but I don't see how I'd integrate it with Docusaurus.
       * The may technically be a convoluted way by importing "prism-svelte" in .docusaurus/client-modules.js,
       * but life is too short.
       * @see https://github.com/pngwn/prism-svelte
       */
      // prism: {
      //   additionalLanguages: ['svelte'],
      // },
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { to: "docs/guides/getting-started", label: "Getting Started" },
            { to: "docs/api/interfaces/buttonprops", label: "API" },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Spectrum",
              href: "https://spectrum.chat/nodegui",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/node_gui",
            },
            {
              label: "Medium",
              to: "https://medium.com/nodegui",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "NodeGui",
              to: "https://nodegui.org",
            },
            // {
            //   label: "FAQ",
            //   to: "https://nodegui.org/faq",
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NodeGui`,
    },
    // googleAnalytics: {
    //   trackingID: "TODO",
    // },
    algolia: {
      apiKey: "2d5f0b46c971ffb4947697ce645520b0",
      indexName: "svelte-nodegui",
      /**
       * Optional. I've filled in some values in a comment for future reference.
       */
      algoliaOptions: {
        // facetFilters: [
        //   /**
        //    * I'm not really sure what these do.
        //    * There is also: lvl1, lvl2, lvl3, lvl4, lvl5
        //    */
        //   "type:content",
        //
        //   /**
        //    * To my understanding, this is irrelevant for now, because we're not supporting multiple versions
        //    * of the docs simultanteously.
        //    * There is also: version:current
        //    */
        //   "version:latest",
        // ],
      },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
