const couponTypes = {
  percent: 'percent',
  value: 'value',
  percentForAmountExeed: 'percentForAmountExeed'// #3
}

function validCouponType (coupon) {
  return Object.values(couponTypes).includes(coupon.type)
}

function isCouponValid (coupon) {
  return !!coupon && validCouponType(coupon) && !!coupon.expired_at
}

function isConsumed (coupon) {
  return !!coupon.consumed_at
}

module.exports = {
  isCouponValid,
  isConsumed,
  couponTypes
}
