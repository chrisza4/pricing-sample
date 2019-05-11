function expressHandler ({ validator, handler }) {
  return async (request, response, next) => {
    try {
      const responseJson = await handler(request, response)
      validator(responseJson)
      response.json(responseJson)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  expressHandler
}
