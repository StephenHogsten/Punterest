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
    path: path.resolve(__dirname, 'public'),
    publicPath: 'http://localhost:300/public/'
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          // We have to write /\.(js|jsx)(\?.*)?$/ rather than just /\.(js|jsx)$/
          // because you might change the hot reloading server from the custom one
          // to Webpack's built-in webpack-dev-server/client?/, which would not
          // get properly excluded by /\.(js|jsx)$/ because of the query string.
          // Webpack 2 fixes this, but for now we include this hack.
          // https://github.com/facebookincubator/create-react-app/issues/1713
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
          /\.scss$/
        ],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
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
      }, { 
        test: /\.svg$/,
        loader: 'file-loader',
        include: paths.appSource,
        query: {
          name: 'public/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}