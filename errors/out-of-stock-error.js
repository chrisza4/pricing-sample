class OutOfStockError extends Error {
  constructor (...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OutOfStockError)
    }

    this.name = 'OutOfStockError'
    this.date = new Date()
  }
}

module.exports = OutOfStockError
