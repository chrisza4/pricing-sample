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
  conditions: {
    type: Array,
    index: true
  },
  type: String,
  discount_pct: Number,
  expired_at: Date,
  discount_value: Number
}, { timestamps: true })

module.exports = mongoose.model('coupons', couponModel)
