jest.mock('../data/item-data')
jest.mock('../data/coupon-data')

const PriceService = require('./price-service')
const ItemData = require('../data/item-data')
const CouponData = require('../data/coupon-data')

describe('PriceService', () => {
  describe('getPrice', () => {
    it('item A price 100 quantity 2, request price without coupon, should return 200', async () => {
      ItemData.getItemByCode.mockResolvedValue({
        title: 'Item A',
        code: 'item_a',
        quantity: 5,
        price: 100
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
        price: 100
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
        price: 100
      })
      CouponData.getCouponByCode.mockResolvedValue({
        code: couponCode,
        type: 'percent',
        discount_pct: 10,
        expired_at: new Date('2200-01-01')
      })
      const price = await PriceService.getPrice({
        quantity: 20,
        itemcode: 'item_a',
        coupon: couponCode
      })
      expect(price.normalPrice).toEqual(2000)
      expect(price.price).toEqual(1800)
    })
  })
})
