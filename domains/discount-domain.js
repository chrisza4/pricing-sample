function applyCoupon (coupon, price, item) {
  // Validate coupon here

  switch (coupon.type) {
    case 'percent':
      return {
        ok: true,
        newPrice: price * (1 - (coupon.discount_pct / 100))
      }
  }
  return {
    ok: false,
    newPrice: null
  }
}

module.exports = {
  applyCoupon
}
