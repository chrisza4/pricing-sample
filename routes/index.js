const PriceController = require('../controllers/price-controller')

function setup (app) {
  app.get('/price', PriceController.getPriceHandler)
}

module.exports = {
  setup
}
