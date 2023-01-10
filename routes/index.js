const express = require('express')
const IndexController = require('../controllers/indexController')
const { isLogin } = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', IndexController.register)
router.post('/login', IndexController.login)

router.get('/profile', isLogin, IndexController.profile)
router.patch('/subscription', isLogin, IndexController.subscription)
router.post('/generate-midtrans-token', isLogin, IndexController.generateMidtransToken)
router.get('/events', IndexController.getAllEvents)

module.exports = router