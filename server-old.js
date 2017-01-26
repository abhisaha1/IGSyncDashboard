require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var sessions = require("express-session");
var path = require('path');
var dateformat = require('dateformat');

var MySQLStore = require('express-mysql-session')(sessions);
var dbConfig = require('./config/mysql.config').config;
var SessionStore = new MySQLStore(dbConfig);


var webpack = require('webpack');
var config = require('./webpack.config.dev');

var Requests = require('./requests');

var app = express(); 


var session = sessions({
    store: SessionStore,
    name: 'session', // cookie name dictates the key name added to the request object
    resave: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365},
    saveUninitialized: false,
    secret: 'snfjd3432k1j33' // should be a large unguessable string
    //duration: 3524 * 60 * 60 * 1000, // how long the session will stay valid in ms
    //activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
});

app.use(session);

/*
 |--------------------------------------------------------------------------
 | Wrap the server with io sockets.
 |--------------------------------------------------------------------------
 */
var http = require('http').Server(app);


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
/*
 |--------------------------------------------------------------------------
 | Our assets need a home. We need to define that place. We can
 | define multiple places. See the commented line below.
 |--------------------------------------------------------------------------
 */
app.use('/', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(bodyParser.json());


Requests.serve(app);

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));




http.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});