const UserController = require('../controllers/userController')
const app = require('express')
const route = app.Router()
const authentication = require('../middlewares/authentication')

route.get('/', authentication, UserController.getUser)
route.post('/register', UserController.register)
route.post('/login', UserController.login)

module.exports = route;