var express = require('express');
import config from '../config/config';
var serverRendering = require('./serverRendering');

const app = express();
app.use(express.static('public'));

// start a webpack-dev-server
var webpack = require('webpack');
var wpConfigFile = (process.env.NODE_ENV == 'dev') ? '../webpack.config.dev.js' : '../webpack.config.prod.js';
var webpackConfig = require(wpConfigFile);
var compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

app.use(serverRendering);
app.listen(config.appPort, function () {
  console.log('====> Admin is listening on', config.appPort);
});
