require('dotenv').config({ silent: true })

const devConfig = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/pricing_dev',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost',
  PRETTY_LOG: process.env.NODE_ENV !== 'production'
}

const testConfig = {
  ...devConfig,
  MONGO_URL: 'mongodb://localhost/pricing_test'
}

const prodConfig = {
  MONGO_URL: process.env.MONGO_URL,
  REDIS_URL: process.env.REDIS_URL,
  PRETTY_LOG: process.env.NODE_ENV
}

function getConfig () {
  switch (process.env.NODE_ENV) {
    case 'development': return devConfig
    case 'test': return testConfig
    default: return prodConfig
  }
}

module.exports = getConfig()
