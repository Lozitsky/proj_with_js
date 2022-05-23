const path = require('path');
const libraryName = 'info-table';
const outputFile = `${libraryName}.min.js`;

var config = {
  entry: {
    app: './src/index.js',
    /*    src: [
          // './src/scss/styles.scss',
          './src/index.js',
        ]*/
  },

  output: {
    // filename: '[name].bundle.js',
    filename: outputFile,
    library: libraryName,
    publicPath: '/',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
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
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  } else if (argv.mode === 'production') {
    config.devtool = 'source-map';
  }

  return config;
};