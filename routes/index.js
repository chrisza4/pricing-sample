const PriceController = require('../controllers/price-controller')

function setup (app) {
  app.get('/price', PriceController.getPriceHandler)
  // app.get('/login')
  // app.get('/signup')
}

module.exports = {
  setup
}
