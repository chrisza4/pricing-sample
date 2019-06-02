const PriceController = require('../controllers/price-controller')
const UserController = require('../controllers/user-controller')

function setup (app) {
  app.get('/price', PriceController.getPriceHandler)
  app.post('/login', UserController.loginHandler)
  app.post('/signup', UserController.signupHandler)
}

module.exports = {
  setup
}
