const CouponDomain = require('./coupon-domain')
const { couponTypes } = CouponDomain

describe('CouponDomain', () => {
  const normalCoupon = {
    code: 'hi',
    type: couponTypes.percent,
    expired_at: new Date('2019-01-01'),
    consumed_at: new Date('2019-01-01')
  }

  const defaultItem = {
    title: 'Item A',
    code: 'item_a',
    quantity: 5,
    price: 1000
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

    it('should return true for coupon specific exist item', () => {
      expect(CouponDomain.isCouponValidWithItem({
        ...normalCoupon,
        valid_item: ['item_a']
      }, defaultItem)).toBeTruthy()
    })

    it('should return false for coupon specific non exist item', () => {
      expect(CouponDomain.isCouponValidWithItem({
        ...normalCoupon,
        valid_item: ['item_b']
      }, defaultItem)).toBeFalsy()
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
