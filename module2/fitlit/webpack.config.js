/*const path = require('path');
module.exports = {
  "mode": "none",
  "entry": "./src/scripts.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  "devtool": "source-map",
  // CSS and file (image) loaders
  "module": {
    "rules": [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      }
    ]
  }
};*/
// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HotModuleReplacementPlugin = require('webpack-hot-middleware');

// const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";
// const mode = process.env.NODE_ENV || "development";
// const isProduction = process.env.NODE_ENV === 'production';
// const isDevelopment = !isProduction;

// const publicPath = process.env.PUBLIC_URL || '/';

module.exports = {
  // mode: mode,
  // mode: isProduction ? 'production' : 'development',
  // bail: isProduction,
  entry: {
    src: [
      // './src/scripts.js',
      './src/scss/styles.scss',
      './src/scripts.js',
    ]
  },
  // target: [target, "es5"],
  output: {
    // path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
    // filename: 'bundle.js',
    // sourceMapFilename: "bundle.js.map"
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js'
  },
  devtool: 'inline-source-map',
  // devtool: 'source-map',
  // mode: 'development',
  // CSS and file (image) loaders
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          // 'style-loader', 'css-loader',
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'css/',
              publicPath: 'css/'
            }
          }
          // , 'css-loader'
          , 'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      }
    ],
  },
  // Below is needed for webpack-dev-server
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
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
