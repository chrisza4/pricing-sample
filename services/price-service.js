const ItemData = require('../data/item-data')
const CouponData = require('../data/coupon-data')
const DiscountDomain = require('../domains/discount-domain')
const ItemDomain = require('../domains/item-domain')
const OutOfStockError = require('../errors/out-of-stock-error')
const ItemNotSupportCoupon = require('../errors/item-not-support-coupon')

async function getPrice (priceRequest) {
  const item = await ItemData.getItemByCode(priceRequest.itemcode)
  const couponCode = priceRequest.coupon
  const coupon = couponCode ? await CouponData.getCouponByCode(couponCode) : null

  if (ItemDomain.thisItemNotSupportCoupon(item, coupon)) {
    throw new ItemNotSupportCoupon('Item not support coupon')
  }
  if (!ItemDomain.containStock(item, priceRequest.quantity)) {
    throw new OutOfStockError('Item exceeds stock')
  }

  const normalPrice = item.price * priceRequest.quantity
  return DiscountDomain.applyCoupon(coupon, normalPrice, item)
}

module.exports = {
  getPrice
}
