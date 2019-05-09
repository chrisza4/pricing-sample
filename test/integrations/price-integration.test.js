const supertest = require('supertest')
const server = require('../../server')
const moment = require('moment')
const { connect } = require('../../connections/mongo')

const ItemData = require('../../data/item-data')
const CouponData = require('../../data/coupon-data')

describe('/price', () => {
  beforeEach(async () => {
    await connect()
    return Promise.all(
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
        CouponData.addCoupon({
          code: 'june_100',
          valid_items: [ ],
          type: 'percent',
          discount_pct: 20,
          expired_at: moment().add(1, 'days').toDate()
        })
      ]
    )
  })
  it('Should be able to fetch price without coupon', async () => {
    const response = await supertest(server)
      .get('/price')
      .query({
        itemcode: 'item1',
        quantity: 3
      })
    expect(response.status).toEqual(200)
    expect(response.body.normalPrice).toEqual(1620)
    expect(response.body.price).toEqual(1620)
  })

  it('Should return 400 for invalid request', async () => {
    const response = await supertest(server)
      .get('/price')
      .query({
        xxxx: 'item1',
        quantity: 3
      })
    expect(response.status).toEqual(400)
  })

  it('Should return discounted price for valid coupon', async () => {
    const response = await supertest(server)
      .get('/price')
      .query({
        itemcode: 'item1',
        quantity: 3,
        coupon: 'june_100'
      })
    expect(response.status).toEqual(400)
  })
})
