const { validateUser } = require('../schemas/user-schema')
const { validateSignupResponse } = require('../schemas/signup-response-schema')
const { validateLoginResponse } = require('../schemas/login-response-schema')
const { expressHandler } = require('./express-handler')
const { signUp, login } = require('../services/user-service')

async function signupHandler (request) {
  const user = validateUser(request.body)
  const userResponse = await signUp(user)
  return userResponse
}

async function loginHandler (request) {
  const user = validateUser(request.body)
  const userResponse = await login(user.email, user.password)
  return userResponse
}

module.exports = {
  signupHandler: expressHandler({
    handler: signupHandler,
    validator: validateSignupResponse
  }),
  loginHandler: expressHandler({
    handler: loginHandler,
    validator: validateLoginResponse
  })
}
