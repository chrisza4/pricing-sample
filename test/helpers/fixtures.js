function mockCoupon (props) {
  const defaultCoupon = {
    code: 'code_1',
    type: 'percent',
    discount_pct: 10,
    expired_at: new Date('2200-01-01')
  }
  return {
    ...defaultCoupon,
    props
  }
}

module.exports = {
  mockCoupon
}
