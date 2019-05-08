const CouponModel = require('../models/coupon-models')
const CouponDomain = require('../domains/coupon-domain')
const NotFoundError = require('../errors/NotFoundError')

function getCouponByCode (code) {
  return CouponModel.findOne({ code: code }).lean()
}

async function consumedCoupon (code, time = new Date()) {
  const coupon = await CouponModel.findOneAndUpdate({
    code
  }, {
    $set: {
      consumed_at: time
    }
  }, {
    new: true
  })
  if (!coupon) {
    throw new NotFoundError('Coupon not found')
  }
  return coupon
}

async function addCoupon ({ code, expiredAt, type }) {
  const coupon = {
    code,
    expired_at: expiredAt,
    type
  }
  if (!CouponDomain.validCoupon(coupon)) {
    throw new TypeError('Invalid coupon type')
  }
  return CouponModel.create(coupon)
}

async function _testClear () {
  return CouponModel.deleteMany({ })
}

module.exports = {
  getCouponByCode,
  consumedCoupon,
  addCoupon,
  _testClear
}
