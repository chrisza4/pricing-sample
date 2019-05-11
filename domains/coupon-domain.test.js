const CouponDomain = require('./coupon-domain')
const { couponTypes } = CouponDomain

describe('CouponDomain', () => {
  const normalCoupon = {
    code: 'hi',
    type: couponTypes.percent,
    expired_at: new Date('2019-01-01'),
    consumed_at: new Date('2019-01-01')
  }

  describe('isCouponValid', () => {
    it('should return true for normal coupon type', () => {
      expect(CouponDomain.isCouponValid(normalCoupon)).toBeTruthy()
    })

    it('should return false for wrong coupon type', () => {
      expect(CouponDomain.isCouponValid({
        ...normalCoupon,
        type: 'random'
      })).toBeFalsy()
    })

    it('should return false for non-expired coupon', () => {
      expect(CouponDomain.isCouponValid({
        ...normalCoupon,
        expired_at: null
      })).toBeFalsy()
    })
  })

  describe('isConsumed', () => {
    it('should return true for coupon that have consumed date', () => {
      expect(CouponDomain.isConsumed(normalCoupon)).toBeTruthy()
    })

    it('should return false for coupon that not have consumed date', () => {
      expect(CouponDomain.isConsumed({
        ...normalCoupon,
        consumed_at: null
      })).toBeFalsy()
    })
  })
})
