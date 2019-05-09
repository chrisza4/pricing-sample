const ItemModel = require('./models/item-models')

function getItemByCode (code) {
  return ItemModel.findOne({ code: code }).lean()
}

module.exports = {
  getItemByCode
}
