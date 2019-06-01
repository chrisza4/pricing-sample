const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      unique: true
    },
    password: {
      type: String
    },
    token: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', userModel)
