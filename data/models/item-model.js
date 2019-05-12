const mongoose = require('mongoose')

const itemModel = new mongoose.Schema({
  title: String,
  code: {
    type: String,
    index: true
  },
  quantity: Number,
  price: Number,
  cannot_apply_coupon: Boolean
}, { timestamps: true })

module.exports = mongoose.model('items', itemModel)
