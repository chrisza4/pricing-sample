const mongo = require('./mongo')
const Sentry = require('./sentry')

async function setup () {
  await mongo.connect()
  await Sentry.connectSentry()
}

module.exports = {
  setup
}
