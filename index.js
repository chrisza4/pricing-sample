const server = require('./server')
const { setup } = require('./connections/setup')
const log = require('./lib/log')

const port = 3000

setup()
  .then(() => server.listen(port, () => log.info(`App listening on port ${port}!`)))
