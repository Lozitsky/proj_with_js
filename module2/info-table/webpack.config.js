
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

const libraryName = 'info-table';
const outputFile = `${libraryName}.min.js`;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 20000, // Convert images < 8kb to base64 strings
            name: 'img/[hash]-[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),

  ],
  devServer: {
    // contentBase: "./dist",
    historyApiFallback: true,
    hot: true,
    watchFiles: {
      paths: ['src/**/*'],
    },
    static: [
      // Simple example
      path.resolve(__dirname, 'dist'),
      // Complex example
      {
        directory: path.resolve(__dirname, 'dist'),
        staticOptions: {},
        // Don't be confused with `dev.publicPath`, it is `publicPath` for static directory
        // Can be:
        // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
        // publicPath: '/static-public-path/',
        publicPath: "/assets/",
        // Can be:
        // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
        serveIndex: true,
        // Can be:
        // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
        watch: true,
      },
    ]
  },
};