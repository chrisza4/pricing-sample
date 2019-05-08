class NotFoundError extends Error {
  constructor (params) {
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError)
    }

    this.name = 'NotFoundError'
    this.date = new Date()
  }
}

module.exports = NotFoundError
