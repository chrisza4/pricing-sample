const moment = require('moment')
const CouponData = require('./coupon-data')
const { setup } = require('../connections/setup')

describe('CouponData', () => {
  beforeAll(() => {
    return setup()
  })
  beforeEach(() => {
    return CouponData._testClear()
  })

  describe('addCoupon', () => {
    it('should be able to add coupon', async () => {
      const code = 'my1'
      const couponBefore = await CouponData.getCouponByCode(code)
      expect(couponBefore).toBeNull()
      await CouponData.addCoupon({
        code: 'my1',
        expiredAt: moment('2019-01-01').toDate(),
        type: 'percent'
      })
      const couponAfter = await CouponData.getCouponByCode(code)
      expect(couponAfter.code).toEqual(code)
    })

    it('not allowed invalid coupon type', () => {
      return CouponData.addCoupon({
        code: 'code',
        expiredAt: moment('2019-01-01').toDate(),
        type: 'random_type'
      }).then(() => {
        throw Error('Should npt okay')
      }, (err) => {
        expect(err.name).toEqual('TypeError')
      })
    })

    it('not allowed non-expired coupon', () => {
      return CouponData.addCoupon({
        code: 'code',
        expiredAt: null,
        type: 'percent'
      }).then(() => {
        throw Error('Should npt okay')
      }, (err) => {
        expect(err.name).toEqual('TypeError')
      })
    })
  })

  describe('consumedCoupon', () => {
    it('should be able to consumed a coupon', async () => {
      await CouponData.addCoupon({
        code: 'my1',
        expiredAt: moment('2019-01-01').toDate(),
        type: 'percent'
      })
      await CouponData.consumedCoupon('my1', moment('2019-01-02').toDate())
      const coupon = await CouponData.getCouponByCode('my1')
      expect(moment(coupon.consumed_at).isSame(moment('2019-01-02'))).toBeTruthy()
    })

    it('should throw notfound error for non-exists coupon', async () => {
      return CouponData.consumedCoupon('no').then(() => {
        throw new Error('Should throw')
      }, (err) => {
        expect(err.name).toEqual('NotFoundError')
      })
    })
  })
})
