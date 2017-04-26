const path = require('path');
const webpack = require('webpack');

const paths = {
  appSource: path.resolve(__dirname, 'src'),
  appIndexJs: path.resolve(__dirname, 'src', 'index.js'),
  output: path.resolve(__dirname, 'public')
}

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: paths.appIndexJs,
  output: {
    filename: 'bundle.js',
    path: paths.public
  },
  module: {
    rules: [
      {
        test: /\.(png|svg)$/,
        include: paths.appSource,
        // include: path.join(__dirname, 'images'),
        loader: 'url-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        include: paths.appSource,
        loader: 'babel-loader'
      }, {
        test: /\.scss$/,
        include: paths.appSource,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoader: 1}
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}