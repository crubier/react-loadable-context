const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = (env, { mode, ...argv }) => ({
  entry:
    mode === "development"
      ? [
          "babel-polyfill",
          "react-hot-loader/patch",
          path.resolve(__dirname, "example/src/index.js")
        ]
      : ["babel-polyfill", path.resolve(__dirname, "example/src/index.js")],
  devtool: mode === "development" ? "eval-source-map" : undefined,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      "react-loadable-context": path.resolve(__dirname, "./src/index.js"),
      "react-loadable-context/loading": path.resolve(
        __dirname,
        "./src/loading/index.js"
      ),
      "react-loadable-context/loading/full": path.resolve(
        __dirname,
        "./src/loading/full.js"
      )
    }
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    publicPath: "",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.MODE": `"${mode}"`
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "example/src/index.html"),
      filename: "./index.html"
    }),
    mode === "development"
      ? new webpack.HotModuleReplacementPlugin()
      : new UglifyJsPlugin()
  ],
  devServer:
    mode === "development"
      ? {
          contentBase: path.resolve(__dirname, "docs"),
          hot: true
        }
      : undefined
});
