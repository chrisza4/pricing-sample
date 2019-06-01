const { couponTypes } = require('../../domains/coupon-domain')

function mockCoupon (props = {}) {
  const defaultCoupon = {
    code: 'code_1',
    type: couponTypes.percent,
    discount_pct: 10,
    expired_at: new Date('2200-01-01')
  }
  return {
    ...defaultCoupon,
    ...props
  }
}

function mockItem (props = {}) {
  const defaultItem = {
    title: 'Item A',
    code: 'item_a',
    quantity: 5,
    price: 100
  }
  return {
    ...defaultItem,
    ...props
  }
}

function mockUser (props = {}) {
  const defaultUser = {
    email: 'steve.j@apple.com',
    password: 'aaaa'
  }
  return {
    ...defaultUser,
    ...props
  }
}

module.exports = {
  mockCoupon,
  mockItem,
  mockUser
}
