const { validatePriceRequest } = require('../schemas/price-request-schema')
const { expressHandler } = require('./express-handler')
const { getPrice } = require('../services/price-service')

async function getPriceHandler (request, response) {
  const priceRequest = validatePriceRequest(request.query)
  const priceResponse = await getPrice(priceRequest)
  response.json(priceResponse)
}

module.exports = {
  getPriceHandler: expressHandler(getPriceHandler)
}
