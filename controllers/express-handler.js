function expressHandler (handler) {
  return async (request, response, next) => {
    try {
      await handler(request, response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  expressHandler
}
