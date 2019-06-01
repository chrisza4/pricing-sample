const { validateUser } = require('../schemas/user-schema')
const { expressHandler } = require('./express-handler')
const { signUp } = require('../services/user-service')

async function signupHandler (request) {
  const user = validateUser(request.body)
  const userResponse = await signUp(user)
  return userResponse
}

module.exports = {
  signupHandler: expressHandler({
    handler: signupHandler,
    validator: validateUser
  })
}
