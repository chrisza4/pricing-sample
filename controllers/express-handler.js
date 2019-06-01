const { errorHandler } = require('./error-controller')
function expressHandler ({ validator, handler }) {
  return async (request, response, next) => {
    try {
      const responseJson = await handler(request, response)
      response.json(validator(responseJson))
    } catch (err) {
      errorHandler(err, response)
    }
  }
}

module.exports = {
  expressHandler
}
