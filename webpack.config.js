const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "babel-polyfill",
    "react-hot-loader/patch",
    path.resolve(__dirname, "example/src/index.js")
  ],
  devtool: "eval-source-map",
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
    path: path.resolve(__dirname, "example/dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "example/src/index.html"),
      filename: "./index.html"
    }),

    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "example/dist"),
    hot: true
  }
};
