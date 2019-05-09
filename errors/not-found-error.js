class NotFoundError extends Error {
  constructor (params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError)
    }

    this.name = 'NotFoundError'
    this.date = new Date()
  }
}

module.exports = NotFoundError
