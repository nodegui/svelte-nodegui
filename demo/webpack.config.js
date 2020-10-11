const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const svelteNativePreprocessor = require("svelte-native-preprocessor");

module.exports = (env, argv) => {
    const config = {
        mode: "production",
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
                                sourceMap: true,
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
                            loader: 'svelte-loader',
                            options: {
                                preprocess: svelteNativePreprocessor(),
                            }
                        }
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                "__DEV__": argv.mode === "development" ? "true" : "false",
            })
        ],
        resolve: {
            extensions: [".ts", ".mjs", ".js", ".svelte", ".scss", ".css", ".json"]
        }
    };

    if (argv.mode === "development") {
        config.mode = "development";
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(new ForkTsCheckerWebpackPlugin());
        config.devtool = "source-map";
        config.watch = true;
        config.entry.unshift("webpack/hot/poll?100");
    }

    return config;
};