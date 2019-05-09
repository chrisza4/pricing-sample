const { connect } = require('../../connections/mongo')
const ItemData = require('../../data/item-data')
const CouponData = require('../../data/coupon-data')

async function initDb () {
  await connect()
  await CouponData._testClear()
  await ItemData._testClear()
}

module.exports = {
  initDb
}
