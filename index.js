const config = require('./config/config')

const server = require('./server')
const log = require('pino')({
  prettyPrint: config.PRETTY_LOG
})

const port = 3000
server.listen(port, () => log.info(`App listening on port ${port}!`))
