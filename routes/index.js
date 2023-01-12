const express = require('express')
const IndexController = require('../controllers/indexController')
const { isLogin } = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', IndexController.register)
router.post('/login', IndexController.login)
router.post('/google', IndexController.loginGoogle)

router.get('/profile', isLogin, IndexController.profile)
router.post('/subscription', isLogin, IndexController.subscription)
router.post('/generate-midtrans-token', isLogin, IndexController.generateMidtransToken)
router.get('/fighters', IndexController.getAllFighters)
router.get('/events', isLogin, IndexController.getAllEvents)
router.get('/logs', isLogin, IndexController.getAllLogsByUser)
router.get('/youtube', IndexController.getYoutubeVideo)
router.get('/fighters/:id', IndexController.getFighterDetail)

module.exports = router