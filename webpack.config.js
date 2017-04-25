const path = require('path');
const autoprefixer = require('autoprefixer');

const paths = {
  appSource: path.resolve(__dirname, 'src'),
  appIndexJs: path.resolve(__dirname, 'src', 'index.js'),
  output: path.resolve(__dirname, 'public')
}

module.exports = {
  entry: paths.appIndexJs,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
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
        test: /\.(svg|png)$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  }
}