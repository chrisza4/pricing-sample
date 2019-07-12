const couponTypes = {
  percent: 'percent',
  value: 'value'
}

function validCouponType (coupon) {
  return Object.values(couponTypes).includes(coupon.type)
}

function isCouponValid (coupon) {
  return !!coupon && validCouponType(coupon) && !!coupon.expired_at
}

function isCouponValidWithItem (coupon, item) {
  return isCouponValid(coupon) && coupon.valid_item.indexOf(item.code) !== -1
}

function isConsumed (coupon) {
  return !!coupon.consumed_at
}

module.exports = {
  isCouponValid,
  isConsumed,
  couponTypes,
  isCouponValidWithItem
}
