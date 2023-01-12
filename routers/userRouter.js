const router = require('express').Router()
const UserController = require('../controllers/userController')
const { authentication } = require('../middleware/auth')


router.post('/register',  UserController.register)
router.post('/login',  UserController.login)
router.get("/user", authentication, UserController.findUser)
router.get("/quotes", UserController.quotes)

module.exports = router