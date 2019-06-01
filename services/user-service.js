const PasswordDomain = require('../domains/password-domain')
const UserData = require('../data/user-data')

async function signUp (user) {
  const newUser = {
    ...user,
    password: PasswordDomain.encryptPassword(user.password)
  }
  return UserData.addUser(newUser)
}

module.exports = {
  signUp
}
