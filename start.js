console.log(process.env)
require('babel-register');
require('./app/server');
require('./api/server');
require('./client/server');