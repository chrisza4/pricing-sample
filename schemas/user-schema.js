const Joi = require('joi')
const InvalidRequestError = require('../errors/invalid-request-error')

const userSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
})

function validateUser (data) {
  const v = Joi.validate(data, userSchema, { stripUnknown: true })
  if (v.error) {
    throw new InvalidRequestError('Invalid Request', v.error.message)
  }
  return v.value
}

module.exports = {
  validateUser
}
