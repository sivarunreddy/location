const webpack = require("webpack");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "app": [
            "./src/polyfills.ts",
            "./src/vendor.ts",
            "./src/main.ts",
        ]
    },
    output: {
        path: `${__dirname}/assets/js`,
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js", ".ts"],
        modules: ['node_modules'],
    },
    resolveLoader: {
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: [
                    "awesome-typescript-loader",
                    "angular2-template-loader"
                ],
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "raw-loader",
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            }
        ]
    },
    devServer: {
        port: 8081,
        publicPath: "./",
    },
    watch: true,
    devtool: "inline-source-map",
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true,
        })
    ]
};