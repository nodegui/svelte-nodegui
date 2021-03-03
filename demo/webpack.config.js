const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SvelteNodeGUIPreprocessor = require("@nodegui/svelte-nodegui-preprocessor");
const SveltePreprocess = require("svelte-preprocess");

module.exports = (env, argv) => {
    const config = {
        mode: "development",
        entry: ["./src/app.ts"],
        target: "node",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "index.js"
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|bmp|otf)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: { publicPath: "dist" }
                        }
                    ]
                },
                {
                    test: /\.node/i,
                    use: [
                        {
                            loader: "native-addon-loader",
                            options: { name: "[name]-[hash].[ext]" }
                        }
                    ]
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "tsconfig.json"),
                            // https://github.com/TypeStrong/ts-loader/blob/ea2fcf925ec158d0a536d1e766adfec6567f5fb4/README.md#faster-builds
                            // https://github.com/TypeStrong/ts-loader/blob/ea2fcf925ec158d0a536d1e766adfec6567f5fb4/README.md#hot-module-replacement
                            transpileOnly: true,
                            allowTsInNodeModules: true,
                            compilerOptions: {
                                sourceMap: argv.mode !== 'production',
                                declaration: false
                            },
                        },
                    }
                },
                {
                    test: /\.mjs$/,
                    type: 'javascript/auto',
                },
                {
                    test: /\.svelte$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            /**
                             * Note: Svelte Native uses a minor patch of svelte-loader. I'm not sure of the significance.
                             * @see https://github.com/halfnelson/svelte-native/blob/0af94fac6ea18f54f93ab299d0b512f91d722569/demo/package.json#L26
                             */
                            loader: 'svelte-loader',
                            options: {
                                preprocess: {
                                    ...SveltePreprocess(),
                                    ...SvelteNodeGUIPreprocessor(),
                                },
                            }
                        }
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                /**
                 * This flag defines how the app should handle a hot module update.
                 * "live-reload": Sends an exit signal, so will be relaunched if running via nodemon.
                 * "hmr": Applies the hot update without exiting the app (not yet implemented!).
                 * "none": The app remains alive, but doesn't apply the update.
                 * undefined: Same as "none".
                 * @type {"live-reload" | "hmr" | "none"}
                 */
                "__HMR_MODE__": argv.mode === "production" ? "\"none\"" : "\"live-reload\"",
                "__DEV__": argv.mode === "development" ? "true" : "false",
                "__TEST__": "false",
            })
        ],
        resolve: {
            extensions: [".ts", ".mjs", ".js", ".svelte", ".scss", ".css", ".json"]
        }
    };

    if (argv.mode === "development" || config.mode === "development") {
        config.mode = "development";
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(new ForkTsCheckerWebpackPlugin());
        config.devtool = "source-map";
        config.watch = true;
        config.entry.unshift("webpack/hot/poll?100");
    }

    return config;
};