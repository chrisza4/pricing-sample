class InvalidRequestError extends Error {
  constructor (...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidRequestError)
    }

    this.name = 'InvalidRequestError'
    this.date = new Date()
  }
}

module.exports = InvalidRequestError
