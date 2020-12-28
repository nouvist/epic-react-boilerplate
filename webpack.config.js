const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackObfuscatorPlugin = require('webpack-obfuscator');
const { GenerateSW } = require('workbox-webpack-plugin');

/**
 * @param {import('webpack').Configuration} options
 * @param {boolean} prod
 * @returns {import('webpack').Configuration}
 */
const config = (options, prod) => ({
  entry: './index.tsx',
  context: `${__dirname}/src`,
  output: {
    publicPath: '/',
    path: `${__dirname}/dist`,
    filename: 'js/[hash].js',
  },
  mode: options.mode,
  devServer: {
    port: 8080,
    contentBase: `${__dirname}/static`,
    historyApiFallback: true,
    watchOptions: {
      ignored: [
        `${__dirname}/node_modules`,
        `${__dirname}/dist`,
        `${__dirname}/static`,
      ],
    },
  },
  ...(prod
    ? {}
    : {
        devtool: 'eval-source-map',
      }),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/i,
        exclude: /(node_modules|dist|static)/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
              '@babel/preset-env',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        exclude: /(node_modules|dist|static)/i,
        use: [
          ...(prod ? [MiniCssExtractPlugin.loader] : ['style-loader']),
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(?!vue|s?css|[tj]sx?|html$)(.+$)/i,
        exclude: /(node_modules|dist|static)/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[ext]/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/static/index.html`,
      filename: 'index.html',
      title: 'My Epic App',
    }),
    ...(prod
      ? [
          new MiniCssExtractPlugin(),
          new WebpackObfuscatorPlugin(),
          new copyWebpackPlugin({
            patterns: ['../static'],
          }),
          new GenerateSW({
            swDest: 'service-worker.js',
            navigateFallback: '/index.html',
          }),
        ]
      : []),
  ],
});

/**
 * @param {string[]} env
 * @param {import('webpack').Configuration} options
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, options) =>
  config(options, options.mode == 'production');
