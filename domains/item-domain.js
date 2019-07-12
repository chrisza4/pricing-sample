function containStock (item, quantity) {
  return quantity <= item.quantity
}
function thisItemNotSupportCoupon (item, coupon) {
  if (coupon != null) {
    return !item.allowCoupon
  } else {
    return false
  }
}

module.exports = {
  containStock,
  thisItemNotSupportCoupon
}
