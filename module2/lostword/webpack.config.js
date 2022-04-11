const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
    './src/scss/styles.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    // path: __dirname + '/dist',
    filename: 'bundle.js',
    sourceMapFilename: "bundle.js.map"
  },
  devtool: 'inline-source-map',
  mode: 'development',
  // CSS and file (image) loaders
  module: {
    rules: [
      {
        // test: /\.(css)$/i,
        // test: /\.(scss)$/i,
        test: /\.(s[ac]ss)$/i,
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [
            // 'style-loader', 'css-loader',
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'css/',
              publicPath: 'css/' 
            }
          }, 'sass-loader'
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
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: './dist'
  }
};