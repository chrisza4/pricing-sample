const ItemModel = require('./models/item-model')

function getItemByCode (code) {
  return ItemModel.findOne({ code: code }).lean()
}

function addItem (item) {
  return ItemModel.create(item).then(c => c.toObject())
}

function _testClear () {
  return ItemModel.deleteMany({})
}

module.exports = {
  getItemByCode,
  addItem,
  _testClear
}
