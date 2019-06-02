const PasswordDomain = require('../domains/password-domain')
const UserData = require('../data/user-data')

async function signUp (user) {
  const newUser = {
    ...user,
    password: PasswordDomain.encryptPassword(user.password)
  }
  return UserData.addUser(newUser)
}

async function login (email, password) {
  const user = await UserData.getByEmail(email)
  if (!user || !PasswordDomain.validatePassword(user.password, password)) {
    return { success: false }
  }
  return {
    success: true,
    token: 'token'
  }
}

module.exports = {
  signUp,
  login
}
