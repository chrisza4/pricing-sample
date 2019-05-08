const couponTypes = {
  percent: 'percent',
  value: 'value'
}

function validCouponType (coupon) {
  return Object.values(couponTypes).includes(coupon.type)
}

function validCoupon (coupon) {
  return !!coupon && validCouponType(coupon) && !!coupon.expired_at
}

function isConsumed (coupon) {
  return !!coupon.consumed_at
}

module.exports = {
  validCoupon,
  isConsumed
}
