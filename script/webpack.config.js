const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pkg = require("../package.json");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    index: [path.join(__dirname, "../src/index.tsx")]
  },

  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: process.env.PUBLIC_PATH || "/"
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },

      {
        test: [/\.bmp/, /\.gif/, /\.jpe?g/, /\.png/, /\.svg/],
        loader: "file-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      filename: "index.html",
      title: pkg.name,
      hash: true,
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      templateParameters: {
        title: pkg.name,
        author: pkg.author,
        description: pkg.description
      },
      minify: production && {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
};
