const Joi = require('joi')

const priceResponseSchema = Joi.object().keys({
  price: Joi.number().required(),
  normalPrice: Joi.number().required()
})

function validatepriceResponse (data) {
  const v = Joi.validate(data, priceResponseSchema, { stripUnknown: true })
  if (v.error) {
    throw new Error(v.error.message)
  }
  return v.value
}

module.exports = {
  validatepriceResponse
}
