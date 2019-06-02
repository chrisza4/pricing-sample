const Joi = require('joi')
const InvalidRequestError = require('../errors/invalid-request-error')

const loginResponseSchema = Joi.object().keys({
  success: Joi.boolean().required(),
  token: Joi.string().optional()
})

function validateLoginResponse (data) {
  const v = Joi.validate(data, loginResponseSchema, { stripUnknown: true })
  if (v.error) {
    throw new InvalidRequestError('Invalid Request', v.error.message)
  }
  return v.value
}

module.exports = {
  validateLoginResponse
}
