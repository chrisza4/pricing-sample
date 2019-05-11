const ItemData = require('../data/item-data')
const CouponData = require('../data/coupon-data')
const DiscountDomain = require('../domains/discount-domain')
const ItemDomain = require('../domains/item-domain')
const OutOfStockError = require('../errors/out-of-stock-error')

async function getPrice (priceRequest) {
  const item = await ItemData.getItemByCode(priceRequest.itemcode)
  const couponCode = priceRequest.coupon
  const coupon = couponCode ? await CouponData.getCouponByCode(couponCode) : null

  if (!ItemDomain.containStock(item, priceRequest.quantity)) {
    throw new OutOfStockError('Item exceeds stock')
  }
  const normalPrice = item.price * priceRequest.quantity
  if (!priceRequest.coupon) {
    return {
      normalPrice, price: normalPrice, message: ''
    }
  }
  const price = DiscountDomain.applyCoupon(coupon, normalPrice, item)
  if (!price.ok) {
    return { normalPrice, price: normalPrice, message: price.error }
  }
  return { normalPrice, price: price.newPrice, message: 'Coupon applied' }
}

module.exports = {
  getPrice
}
