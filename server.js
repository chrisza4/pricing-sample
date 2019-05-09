const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { errorHandler } = require('./controllers/error-controller')
const routes = require('./routes')

app.use(bodyParser.json())
routes.setup(app)
app.use(errorHandler)

module.exports = app
