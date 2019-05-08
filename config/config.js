require('dotenv')

const config = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost',
  PRETTY_LOG: process.env.NODE_ENV !== 'production'
}

module.exports = config
