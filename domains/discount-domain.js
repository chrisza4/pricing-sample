const moment = require('moment')
const { couponTypes } = require('./coupon-domain')

function applyCoupon (coupon, price, item, now = new Date()) {
  if (!coupon) {
    return { normalPrice: price, price, message: '' }
  }
  const couponValidateResult = validateCoupon(coupon, price, item, now)
  if (!couponValidateResult.ok) {
    return {
      normalPrice: price,
      price,
      message: couponValidateResult.error
    }
  }

  const itemValidateResult = canItemApplyCoupon(item)
  if (!itemValidateResult.ok) {
    return {
      normalPrice: price,
      price,
      message: itemValidateResult.error
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

function canItemApplyCoupon (item) {
  if (item.cannot_apply_coupon) {
    return {
      ok: false,
      error: 'Coupon cannot be applied to this item'
    }
  }
  return {
    ok: true
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
