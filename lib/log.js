const config = require('../config/config')
const log = require('pino')({
  prettyPrint: config.PRETTY_LOG
})

module.exports = log
