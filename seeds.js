const { connect } = require('./connections/mongo')

const CouponData = require('./data/coupon-data')
const ItemData = require('./data/item-data')

async function seeds () {
  await connect()
  await Promise.all(
    [
      ItemData.addItem({
        code: 'item1',
        price: 540,
        quantity: 5
      }),
      ItemData.addItem({
        code: 'item2',
        price: 100,
        quantity: 20
      }),
      ItemData.addItem({
        code: 'item3',
        price: 300,
        quantity: 11
      }),
      ItemData.addItem({
        code: 'item4',
        price: 300,
        quantity: 11,
        cannot_apply_coupon: true
      }),
      CouponData.addCoupon({
        code: 'june_100',
        valid_items: [ ],
        type: 'percent',
        discount_pct: 20
      })
    ]
  )
}

seeds()
  .then(() => console.log('Done deal!!'))
  .catch(err => console.log(err))
