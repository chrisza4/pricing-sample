const config = require('./config/config')
const server = require('./server')
const mongo = require('./connections/mongo')
const log = require('./lib/log')

const port = 3000

mongo.connect()
server.listen(port, () => log.info(`App listening on port ${port}!`))
