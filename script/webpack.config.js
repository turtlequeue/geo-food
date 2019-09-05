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
    filename: '[name].js',
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
        loader: 'file-loader'
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG', 'TURTLEQUEUE_USER_TOKEN', 'TURTLEQUEUE_API_KEY', 'GMAP_API_KEY']),
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),
  ],

  devServer: {
    port: 8082,
    contentBase: [path.resolve(__dirname, '../dist')],
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
