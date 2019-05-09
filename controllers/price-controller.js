const { validatePriceRequest } = require('../schemas/price-request-schema')
const { getPrice } = require('../services/price-service')

async function getPriceHandler (request, response) {
  const priceRequest = validatePriceRequest(request.query)
  const priceResponse = await getPrice(priceRequest)
  request.json(priceResponse)
}

module.exports = {
  getPriceHandler
}
