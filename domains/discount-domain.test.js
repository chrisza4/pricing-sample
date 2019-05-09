const moment = require('moment')
const DiscountDomain = require('./discount-domain')
const Fixtures = require('../test/helpers/fixtures')
const { couponTypes } = require('./coupon-domain')

describe('ApplyCoupon', () => {
  const today = moment('2019-02-01').toDate()

  it('for coupon with discount pct, should discount from price', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: moment('2019-03-01').toDate()
    })
    const { ok, newPrice } = DiscountDomain.applyCoupon(coupon, 400, Fixtures.mockItem(), today)
    expect(ok).toBeTruthy()
    expect(newPrice).toEqual(320)
  })

  it('for expired coupon, should not be able to applied', () => {
    const expiredDate = moment('2019-01-01').toDate()

    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: expiredDate
    })
    const { ok, error } = DiscountDomain.applyCoupon(coupon, 400, Fixtures.mockItem(), today)
    expect(ok).toBeFalsy()
    expect(error).toEqual('Coupon expired')
  })
})
