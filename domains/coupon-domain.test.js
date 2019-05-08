const CouponDomain = require('./coupon-domain')
describe('CouponDomain', () => {
  const normalCoupon = {
    code: 'hi',
    type: 'percent',
    expired_at: new Date('2019-01-01')
  }
  describe('validCoupon', () => {
    it('should return true for normal coupon type', () => {
      expect(CouponDomain.validCoupon(normalCoupon)).toBeTruthy()
    })

    it('should return false for wrong coupon type', () => {
      expect(CouponDomain.validCoupon({
        ...normalCoupon,
        type: 'random'
      })).toBeFalsy()
    })

    it('should return false for non-expired coupon', () => {
      expect(CouponDomain.validCoupon({
        ...normalCoupon,
        expired_at: null
      })).toBeFalsy()
    })
  })
})
