var path = require('path')
var webpack = require('webpack')

var PROD = process.env.NODE_ENV === 'production'

var devtool = PROD ? undefined : 'cheap-module-eval-source-map'
var entry = PROD ? './index' : ['webpack-hot-middleware/client', './index']
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
]
if (PROD) {

}
else {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  devtool: devtool,
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
