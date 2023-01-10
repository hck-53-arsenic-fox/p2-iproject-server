const UserController = require('../controllers/userController')
const app = require('express')
const route = app.Router()

route.post('/register', UserController.register)

module.exports = route;