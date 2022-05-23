const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          }
        ],
        include: [
          path.resolve(__dirname, 'src/css'),
          path.resolve(__dirname, 'src/scss')
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, '/src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
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
});