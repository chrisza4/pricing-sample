const mongoose = require('mongoose')

const couponModel = new mongoose.Schema({
  code: {
    type: String,
    index: true
  },
  consumed_at: Date,
  valid_items: {
    type: Array,
    index: true
  },
  type: String,
  discount_pct: Number,
  price_limit_for_discount: Number,
  expired_at: Date,
  discount_value: Number
}, { timestamps: true })

module.exports = mongoose.model('coupons', couponModel)
