var env = process.env.NODE_ENV || 'development'

var config = {
    development: require('./config/dev.js'),
}

module.exports = config[env]