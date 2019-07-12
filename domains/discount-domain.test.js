const moment = require('moment')
const DiscountDomain = require('./discount-domain')
const Fixtures = require('../test/helpers/fixtures')
const { precision } = require('../test/helpers/constants')
const { couponTypes } = require('./coupon-domain')

describe('ApplyCoupon', () => {
  const today = moment('2019-02-01').toDate()

  it('for coupon with discount pct, given price of 400 and discount 20%, return new price of 320', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: moment('2019-03-01').toDate(),
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(
      coupon,
      400,
      Fixtures.mockItem(),
      today
    )
    expect(normalPrice).toEqual(400)
    expect(price).toEqual(320)
    expect(message).toEqual('Coupon applied')
  })

  it('for coupon with value, given price 300 and discount value 40, return new price of 260', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.value,
      discount_value: 40,
      expired_at: moment('2019-03-01').toDate(),
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(
      coupon,
      300,
      Fixtures.mockItem(),
      today
    )
    expect(normalPrice).toEqual(300)
    expect(price).toEqual(260)
    expect(message).toEqual('Coupon applied')
  })

  it('for coupon with discount pct that must be apply under 5000, given price of 4999 and discount 20%, return new price of 3999.2', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      applycond: 'applyunder',
      valid_price: 5000,
      expired_at: moment('2019-03-01').toDate(),
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(
      coupon,
      4999,
      Fixtures.mockItem(),
      today
    )
    expect(normalPrice).toEqual(4999)
    expect(price).toBeCloseTo(3999.2, precision)
    expect(message).toEqual('Coupon applied')
  })

  it('for coupon with discount pct that must be apply under 5000, given price of 5000 and discount 20%, return new price of 5000', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      applycond: 'applyunder',
      valid_price: 5000,
      expired_at: moment('2019-03-01').toDate(),
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(
      coupon,
      5000,
      Fixtures.mockItem(),
      today
    )
    expect(normalPrice).toEqual(5000)
    expect(price).toEqual(5000)
    expect(message).toEqual('Coupon not match condition')
  })

  it('for expired coupon, should not be able to applied', () => {
    const expiredDate = moment('2019-01-01').toDate()

    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: expiredDate,
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(
      coupon,
      300,
      Fixtures.mockItem(),
      today
    )
    expect(message).toEqual('Coupon expired')
    expect(normalPrice).toEqual(300)
    expect(normalPrice).toEqual(price)
  })

  it('for coupon with applycond="applyunder" and price is over or equal valid_price, should not be able to applied', () => {
    const expiredDate = moment('2019-03-01').toDate()

    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      valid_price: 5000,
      applycond: 'applyunder',
      expired_at: expiredDate,
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(
      coupon,
      5001,
      Fixtures.mockItem(),
      today
    )
    expect(message).toEqual('Coupon not match condition')
    expect(normalPrice).toEqual(5001)
    expect(normalPrice).toEqual(price)
  })

  it('for no coupon, should return same price with no extra message', () => {
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(
      null,
      300,
      Fixtures.mockItem(),
      today
    )
    expect(message).toEqual('')
    expect(normalPrice).toEqual(300)
    expect(normalPrice).toEqual(price)
  })
})
