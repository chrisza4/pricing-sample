const bcrypt = require('bcrypt')
function encryptPassword (password) {
  return bcrypt.hashSync(password, 10)
}

function validatePassword (hashedPassword, rawPassword) {
  return bcrypt.compareSync(rawPassword, hashedPassword)
}

module.exports = {
  encryptPassword,
  validatePassword
}
