const express = require('express')
const IndexController = require('../controllers/indexController')
const { isLogin } = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', IndexController.register)
router.post('/login', IndexController.login)

router.use(isLogin)

router.get('/profile', IndexController.profile)
router.patch('/subscription', IndexController.subscription)
router.post('/generate-midtrans-token', IndexController.generateMidtransToken)


module.exports = router