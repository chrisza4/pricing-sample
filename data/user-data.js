const UserModel = require('./models/user-model')

async function getByEmail (email) {
  return UserModel.findOne({ email })
}
async function addUser (user) {
  const res = await UserModel.create(user)
  return res.toObject()
}
async function _testClear () {
  return UserModel.deleteMany({})
}

module.exports = {
  addUser,
  getByEmail,
  _testClear
}
