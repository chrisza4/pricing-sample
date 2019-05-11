const ItemDomain = require('./item-domain')
const { mockItem } = require('../test/helpers/fixtures')

describe('containStock', () => {
  it('should return true if request quantity is less than what our stock is', () => {
    const items = mockItem({ quantity: 10 })
    expect(ItemDomain.containStock(items, 8)).toBeTruthy()
  })

  it('should return true if request quantity is equal to what our stock is', () => {
    const items = mockItem({ quantity: 10 })
    expect(ItemDomain.containStock(items, 10)).toBeTruthy()
  })

  it('should return false if request quantity is more than what our stock is', () => {
    const items = mockItem({ quantity: 10 })
    expect(ItemDomain.containStock(items, 20)).toBeFalsy()
  })
})
