const Joi = require('joi')
const InvalidRequestError = require('../errors/invalid-request-error')

const priceRequestSchema = Joi.object().keys({
  itemcode: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  coupon: Joi.string().optional().default('')
})

function validatePriceRequest (data) {
  const v = Joi.validate(data, priceRequestSchema, { stripUnknown: true })
  if (v.error) {
    throw new InvalidRequestError('Invalid Request', v.error.message)
  }
  return v.value
}

module.exports = {
  validatePriceRequest
}
