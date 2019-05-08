const config = require('../config/config')
const mongoose = require('mongoose')
const log = require('../lib/log')

let _connected = false

async function connect () {
  if (_connected) {
    return
  }
  await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })
  mongoose.connection.on('error', (err) => log.error(err, 'MongoDb connection error:'))
  log.info('MongoDb Connected')
  _connected = true
}

module.exports = {
  connect
}
