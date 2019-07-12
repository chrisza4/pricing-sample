jest.mock('../data/item-data')
jest.mock('../data/coupon-data')

const moment = require('moment')
const PriceService = require('./price-service')
const ItemData = require('../data/item-data')
const CouponData = require('../data/coupon-data')
const { couponTypes } = require('../domains/coupon-domain')

describe('PriceService', () => {
  describe('getPrice', () => {
    it('item A price 100 quantity 2, request price without coupon, should return 200', async () => {
      ItemData.getItemByCode.mockResolvedValue({
        title: 'Item A',
        code: 'item_a',
        quantity: 5,
        price: 100,
        allowCoupon: false
      })

      const price = await PriceService.getPrice({
        quantity: 2,
        itemcode: 'item_a'
      })
      expect(ItemData.getItemByCode).toBeCalledWith('item_a')
      expect(price.normalPrice).toEqual(200)
      expect(price.price).toEqual(200)
    })

    it('item A price 100 quantity 10, request price for 20 quantity, should throw OutOfStockError', async () => {
      ItemData.getItemByCode.mockResolvedValue({
        title: 'Item A',
        code: 'item_a',
        quantity: 10,
        price: 100,
        allowCoupon: false
      })
      return PriceService.getPrice({
        quantity: 20, itemcode: 'item_a'
      }).then(
        () => {
          throw new Error('Should failed')
        },
        (err) => {
          expect(err.name).toEqual('OutOfStockError')
        }
      )
    })

    it(`item A price 100 quantity 20,
        request price for 10 quantity,
        with coupon of 10% discount
        should return normalPrice 2000 and price 1800`, async () => {
      const couponCode = 'coupon1'
      ItemData.getItemByCode.mockResolvedValue({
        title: 'Item A',
        code: 'item_a',
        quantity: 20,
        price: 100,
        allowCoupon: true
      })
      CouponData.getCouponByCode.mockResolvedValue({
        code: couponCode,
        type: couponTypes.percent,
        discount_pct: 10,
        expired_at: moment('2100-01-01').toDate()
      })
      const price = await PriceService.getPrice({
        quantity: 20,
        itemcode: 'item_a',
        coupon: couponCode
      })
      expect(price.normalPrice).toEqual(2000)
      expect(price.price).toEqual(1800)
      expect(price.message).toEqual('Coupon applied')
    })

    it('Given an expired coupon, should return same price with error message', async () => {
      const couponCode = 'coupon1'
      ItemData.getItemByCode.mockResolvedValue({
        title: 'Item A',
        code: 'item_a',
        allowCoupon: true,
        quantity: 20,
        price: 100
      })
      CouponData.getCouponByCode.mockResolvedValue({
        code: couponCode,
        type: couponTypes.percent,
        discount_pct: 10,
        expired_at: moment('1999-01-01').toDate()
      })
      const price = await PriceService.getPrice({
        quantity: 20,
        itemcode: 'item_a',
        coupon: couponCode
      })
      expect(price.normalPrice).toEqual(2000)
      expect(price.price).toEqual(2000)
      expect(price.message).toEqual('Coupon expired')
    })
  })
})
