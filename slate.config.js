/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const merge = require('webpack-merge');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': merge([
    {
      resolve: {
        alias: {
          jquery: path.resolve('./node_modules/jquery'),
          'lodash-es': path.resolve('./node_modules/lodash-es'),
          vue: 'vue/dist/vue.min'
        },
      }
    },
    {
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.css$/,
            exclude: /swiper/,
            use: [
              process.env.NODE_ENV !== 'production'
                ? 'vue-style-loader'
                : MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          }
        ]
      },
      plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin()
      ],
      optimization: {
        splitChunks: {
          minSize: 9999999
        }
      }
    }
  ])
};
