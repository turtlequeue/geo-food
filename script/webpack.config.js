const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/index.js'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[name]-[hash:8].js' : '[name].js',
    publicPath: process.env.PATHNAME_BASE || '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: [/\.html?$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },

      {
        test: [/\.bmp/, /\.gif/, /\.jpe?g/, /\.png/, /\.svg/],
        loader: 'file-loader',
        options: {
          name: production ? '[hash:8].[ext]' : '[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),
  ],

  devtool: production ? 'source-map' : false,

  devServer: {
    port: 8082,
    contentBase: [path.resolve(__dirname, '../dist')],
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
