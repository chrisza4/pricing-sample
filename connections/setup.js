const mongo = require('./mongo')

async function setup () {
  await mongo.connect()
}

module.exports = {
  setup
}
