const moment = require('moment')
const { couponTypes } = require('./coupon-domain')

function applyCoupon (coupon, price, item, now = new Date()) {
  const { ok, error } = validateCoupon(coupon, price, item, now)
  if (!ok) {
    return { ok, error, newPrice: null }
  }

  switch (coupon.type) {
    case couponTypes.percent:
      return {
        ok: true,
        newPrice: price * (1 - (coupon.discount_pct / 100))
      }
    case couponTypes.value: {
      return {
        ok: true,
        newPrice: price - coupon.discount_value
      }
    }
  }
  return {
    ok: false,
    newPrice: null
  }
}

function validateCoupon (coupon, price, item, now = new Date()) {
  if (moment(coupon.expired_at).isBefore(moment(now))) {
    return {
      ok: false,
      error: 'Coupon expired'
    }
  }
  return {
    ok: true
  }
}

module.exports = {
  applyCoupon
}
