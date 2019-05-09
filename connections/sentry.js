const Sentry = require('@sentry/node')
const Config = require('../config/config')

function connectSentry () {
  Sentry.init({ dsn: Config.SENTRY_URL })
}

module.exports = {
  connectSentry
}
