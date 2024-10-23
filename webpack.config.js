const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackHookPlugin = require('webpack-hook-plugin');

module.exports = {
  entry: {
    popup: './src/popup.tsx',
    content: './src/content.tsx',
    background: './src/background.ts',
  },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'firefox/static/css/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/popup.html'), to: path.resolve(__dirname, 'build/firefox') },
        { from: path.resolve(__dirname, 'public/images'), to: path.resolve(__dirname, 'build/firefox/images') },
        { from: path.resolve(__dirname, 'public/popup.html'), to: path.resolve(__dirname, 'build/chrome') },
        { from: path.resolve(__dirname, 'public/images'), to: path.resolve(__dirname, 'build/chrome/images') },
        { from: path.resolve(__dirname, 'public/manifests/firefox.json'), to: path.resolve(__dirname, 'build/firefox/manifest.json') },
        { from: path.resolve(__dirname, 'public/manifests/chrome.json'), to: path.resolve(__dirname, 'build/chrome/manifest.json') },
      ],
    }),
    new WebpackHookPlugin({
      onBuildEnd: ['node src/utils/build.js']
    })
  ],
  resolve: {
    extensions: ['.tsx', 'jsx', '.ts', '.js'],
  },
  output: {
    filename: 'firefox/static/js/[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
};