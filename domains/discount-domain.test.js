const moment = require('moment')
const DiscountDomain = require('./discount-domain')
const Fixtures = require('../test/helpers/fixtures')
const { couponTypes } = require('./coupon-domain')

describe('ApplyCoupon', () => {
  const today = moment('2019-02-01').toDate()

  it('for coupon with discount pct, given price of 400 and discount 20%, return new price of 320', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: moment('2019-03-01').toDate()
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(coupon, 400, Fixtures.mockItem(), today)
    expect(normalPrice).toEqual(400)
    expect(price).toEqual(320)
    expect(message).toEqual('Coupon applied')
  })

  it('for coupon with value, given price 300 and discount value 40, return new price of 260', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.value,
      discount_value: 40,
      expired_at: moment('2019-03-01').toDate()
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(coupon, 300, Fixtures.mockItem(), today)
    expect(normalPrice).toEqual(300)
    expect(price).toEqual(260)
    expect(message).toEqual('Coupon applied')
  })

  it('for expired coupon, should not be able to applied', () => {
    const expiredDate = moment('2019-01-01').toDate()

    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: expiredDate
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(coupon, 300, Fixtures.mockItem(), today)
    expect(message).toEqual('Coupon expired')
    expect(normalPrice).toEqual(300)
    expect(normalPrice).toEqual(price)
  })

  it('for no coupon, should return same price with no extra message', () => {
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(null, 300, Fixtures.mockItem(), today)
    expect(message).toEqual('')
    expect(normalPrice).toEqual(300)
    expect(normalPrice).toEqual(price)
  })

  it('for coupon specific item, should able to applied only specific item', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: moment('2019-03-01').toDate(),
      specific_item: ['00000000000000001']
    })

    const item = Fixtures.mockItem({
      _id: '00000000000000001',
      title: 'Item B',
      code: 'item_b',
      quantity: 5,
      price: 100
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(coupon, 400, item, today)
    expect(normalPrice).toEqual(400)
    expect(price).toEqual(320)
    expect(message).toEqual('Coupon applied')
  })

  it('for coupon specific item, should not be able to applied not include', () => {
    const coupon = Fixtures.mockCoupon({
      type: couponTypes.percent,
      discount_pct: 20,
      expired_at: moment('2019-03-01').toDate(),
      specific_item: ['00000000000000001']
    })

    const item = Fixtures.mockItem({
      _id: '00000000000000099',
      title: 'Item B',
      code: 'item_b',
      quantity: 5,
      price: 100
    })
    const { normalPrice, price, message } = DiscountDomain.applyCoupon(coupon, 400, item, today)
    expect(message).toEqual('Item not apply this coupon')
    expect(normalPrice).toEqual(400)
    expect(normalPrice).toEqual(price)
  })
})
