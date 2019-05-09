const DiscountDomain = require('./discount-domain')
const Fixtures = require('../test/helpers/fixtures')

describe('ApplyCoupon', () => {
  it('for coupon with discount pct, should discount from price', () => {
    const coupon = Fixtures.mockCoupon({
      type: 'percent',
      discount_pct: 20
    })
    const { ok, newPrice } = DiscountDomain.applyCoupon(coupon, 400)
    expect(ok).toBeTruthy()
    expect(newPrice).toEqual(360)
  })
})
