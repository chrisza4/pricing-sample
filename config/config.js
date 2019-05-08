require('dotenv').config({ silent: true })

const devConfig = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/pricing_dev',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost',
  PRETTY_LOG: process.env.NODE_ENV !== 'production'
}

const prodConfig = {
  MONGO_URL: process.env.MONGO_URL,
  REDIS_URL: process.env.REDIS_URL,
  PRETTY_LOG: process.env.NODE_ENV
}


module.exports = process.env.NODE_ENV !== 'production' ? devConfig : prodConfig
