const ItemModel = require('./models/item-model')

function getItemByCode (code) {
  return ItemModel.findOne({ code: code }).lean()
}

function addItem (item) {
  return ItemModel.create(item).then(c => c.toObject())
}

module.exports = {
  getItemByCode,
  addItem
}
