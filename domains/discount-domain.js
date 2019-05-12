const moment = require('moment')
const { couponTypes } = require('./coupon-domain')

function applyCoupon(coupon, price, item, now = new Date()) {
  if (!coupon) {
    return { normalPrice: price, price, message: '' }
  }
  const { ok, error } = validateCoupon(coupon, price, item, now)
  if (!ok) {
    return {
      normalPrice: price,
      price,
      message: error
    }
  }
  switch (coupon.type) {
    case couponTypes.percent:
      return {
        normalPrice: price,
        price: price * (1 - (coupon.discount_pct / 100)),
        message: 'Coupon applied'
      }
    case couponTypes.value: {
      return {
        normalPrice: price,
        price: price - coupon.discount_value,
        message: 'Coupon applied'
      }
    }
  }
  return {
    ok: false,
    newPrice: null
  }
}

function validateCoupon(coupon, price, item, now = new Date()) {
  if (moment(coupon.expired_at).isBefore(moment(now))) {
    return {
      ok: false,
      error: 'Coupon expired'
    }
  }
  if (coupon.type === couponTypes.percent && coupon.discount_pct === 20 && price <= 1000) {
    return {
      ok: false,
      error: '20% for more than 1,000 THB shop'
    }
  }
  return {
    ok: true
  }
}

module.exports = {
  applyCoupon
}
