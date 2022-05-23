const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return merge(common, {
    optimization: {
      minimize: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: path.resolve('./utils/remove-dev.loader.js'),
              options: {isDevelopment},
            },
          ],
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
          include: [
            path.resolve(__dirname, 'src/lib'),
          ],
          exclude: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src/scss'),
          ]
        },
        {
          test: /\.(s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              }
            }
          ],
          include: [
            path.resolve(__dirname, 'src/css'),
          ],
          exclude: [
            path.resolve(__dirname, 'src/scss'),
          ]
        },
      ]
    }
  });
}