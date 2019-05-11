const ItemData = require('./item-data')
const { mockItem } = require('../test/helpers/fixtures')
const { setup } = require('../connections/setup')

describe('Item data', () => {
  beforeAll(() => {
    return setup()
  })
  beforeEach(() => {
    return ItemData._testClear()
  })

  it('Can do normal CRUD correctly', async () => {
    const myStockBeforeExists = await ItemData.getItemByCode('myStock')
    expect(myStockBeforeExists).toBeNull()
    const item1 = mockItem({
      code: 'myStock'
    })
    await ItemData.addItem(item1)
    const myStock = await ItemData.getItemByCode('myStock')
    expect(myStock.code).toEqual('myStock')
  })
})
