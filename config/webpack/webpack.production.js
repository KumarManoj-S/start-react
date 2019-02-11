const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin')
const commonPaths = require('./commonPaths');


const clientConfig = {
  name: 'client',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  entry: [
    'babel-polyfill',
    commonPaths.entryPath
  ],
  output: {
    path: commonPaths.outputPath,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|svg|jpg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[hash].[ext]'
            }
          }
        ]
      },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([commonPaths.outputPath], { root: __dirname, allowExternal: true }),
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new CopyWebpackPlugin([
      { from: 'app/images', to: 'images' },
      { from: 'app/images/favicon.ico' },
    ]),
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
      'process.env': {
        BROWSER: true,
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new LoadablePlugin()
  ],
  optimization: {
    minimizer: [new TerserPlugin(
      {
        sourceMap: true,
      }
    )],
  },
};

const serverConfig = {
  mode: 'production',
  name: 'server',
  entry: './server/index.js',
  target: 'node',
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.png', '.jpg', '.gif']
  },
  externals: [nodeExternals()],
  output: {
    path: commonPaths.outputPath,
    filename: 'server.js',
    publicPath: '/',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[hash].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new LoadablePlugin(),
    new CleanWebpackPlugin([commonPaths.outputPath], { root: __dirname, allowExternal: true }),
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
      'process.env': {
        BROWSER: false,
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin(
      {
        sourceMap: true,
      }
    )],
  },
};

module.exports = [clientConfig, serverConfig];
