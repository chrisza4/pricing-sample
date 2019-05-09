const ItemData = require('../data/item-data')
const CouponData = require('../data/coupon-data')
const DiscountDomain = require('../domains/discount-domain')
const OutOfStockError = require('../errors/out-of-stock-error')

async function getPrice (priceRequest) {
  const item = await ItemData.getItemByCode(priceRequest.itemcode)
  const couponCode = priceRequest.coupon
  const coupon = couponCode ? await CouponData.getCouponByCode(couponCode) : null

  if (priceRequest.quantity > item.quantity) {
    throw new OutOfStockError('Item exceeds stock')
  }
  const normalPrice = item.price * priceRequest.quantity
  if (!priceRequest.coupon) {
    return {
      normalPrice, price: normalPrice
    }
  }
  const price = DiscountDomain.applyCoupon(coupon, normalPrice, item)

  if (!price.ok) {
    throw new Error('Coupon error')
  }
  return { normalPrice, price: price.newPrice }
}

module.exports = {
  getPrice
}
