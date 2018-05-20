const webpack = require("webpack");

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "babel-polyfill",
    "react-hot-loader/patch",
    __dirname + "/example/src/index.js"
  ],
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
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/example/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: __dirname + "/example/src/index.html",
      filename: "./index.html"
    }),

    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: __dirname + "/example/dist",
    hot: true
  }
};
