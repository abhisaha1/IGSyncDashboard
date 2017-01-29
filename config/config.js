const env = {
    common: {
        "CLIENTPORT": 4040,
        "APIPORT": 3030,
        "APPPORT": 5050
    },
    production: {
        "NODE_ENV": "production",
        "APIHOST": "api.cliptales.com"
    },
    development: {
        "NODE_ENV": "dev",
        "APIHOST": "localhost"
    }

}
var config = {};
config.clientPort = env.common.CLIENTPORT
config.appPort = env.common.APPPORT
config.apiPort = env.common.APIPORT

//check if this file is being read from client
if (typeof __CONFIG__ !== 'undefined') {
    config.apiUrl = __CONFIG__.apiUrl
} else {
    if (process.env.NODE_ENV == 'dev') {
        config.apiUrl = 'http://'+env.development.APIHOST+':'+env.common.APIPORT
    } else {
        config.apiUrl = 'http://'+env.production.APIHOST
    }
}
module.exports = config;