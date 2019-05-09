const moment = require('moment')
const CouponData = require('./coupon-data')
const { setup } = require('../connections/setup')
const CouponDomain = require('../domains/coupon-domain')

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
  })

  describe('consumedCoupon', () => {
    it('should be able to consumed a coupon', async () => {
      const freshCoupon = await CouponData.addCoupon({
        code: 'my1',
        expiredAt: moment('2019-01-01').toDate(),
        type: 'percent'
      })
      expect(CouponDomain.isConsumed(freshCoupon)).toBeFalsy()
      await CouponData.consumedCoupon('my1', moment('2019-01-02').toDate())
      const coupon = await CouponData.getCouponByCode('my1')
      expect(CouponDomain.isConsumed(coupon)).toBeTruthy()
      expect(moment(coupon.consumed_at).isSame(moment('2019-01-02'))).toBeTruthy()
    })
  })
})
