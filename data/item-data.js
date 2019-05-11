const ItemModel = require('./models/item-model')

function getItemByCode (code) {
  return ItemModel.findOne({ code: code }).lean()
}

function addItem (item) {
  return ItemModel.create(item).then(c => c ? c.toObject() : null)
}

function _testClear () {
  return ItemModel.deleteMany({})
}

module.exports = {
  getItemByCode,
  addItem,
  _testClear
}
