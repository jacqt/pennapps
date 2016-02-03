var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express')
var fs = require('fs')

var app = new express()
var port = process.env.PORT || 3333

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("*", function(req, res) {
  var file = __dirname + '/dist' + req.url
  fs.access(file, fs.F_OK, function(err) {
    if (err) {
      file = __dirname + '/dist/index.html'
    }
    res.sendFile(file)
  })
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s...", port)
  }
})
