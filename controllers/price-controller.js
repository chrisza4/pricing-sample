const { validatePriceRequest } = require('../schemas/price-request-schema')
const { validatePriceResponse } = require('../schemas/price-response-schema')
const { expressHandler } = require('./express-handler')
const { getPrice } = require('../services/price-service')

async function getPriceHandler (request) {
  const priceRequest = validatePriceRequest(request.query)
  const priceResponse = await getPrice(priceRequest)
  return priceResponse
}

module.exports = {
  getPriceHandler: expressHandler({
    handler: getPriceHandler,
    validator: validatePriceResponse
  })
}
