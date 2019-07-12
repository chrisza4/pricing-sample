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

function isCouponItemValid (coupon, item) {
  let isValidItem = true
  if (coupon.valid_items.length > 0) {
    isValidItem = coupon.valid_items.indexOf(item.code) !== -1
  }
  return isCouponValid(coupon) && isValidItem
}

function isConsumed (coupon) {
  return !!coupon.consumed_at
}

module.exports = {
  isCouponValid,
  isConsumed,
  isCouponItemValid,
  couponTypes
}
