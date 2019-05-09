function errorHandler (err, request, response, next) {
  const errType = err.name
  switch (errType) {
    case 'NotFoundError':
      return response.status(404).json({ err: 'not_found', message: err.message })
    case 'InvalidRequestError':
      return response.status(400).json({ err: 'bad_request', message: err.message, detail: err.detail })
    default:
      return response.status(500).json({ err: 'internal', message: err.message })
  }
}

module.exports = {
  errorHandler
}
