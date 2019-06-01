const Joi = require('joi')
const InvalidRequestError = require('../errors/invalid-request-error')

const signupResponseSchema = Joi.object().keys({
  email: Joi.string().required()
})

function validateSignupResponse (data) {
  const v = Joi.validate(data, signupResponseSchema, { stripUnknown: true })
  if (v.error) {
    throw new InvalidRequestError('Invalid Request', v.error.message)
  }
  return v.value
}

module.exports = {
  validateSignupResponse
}
