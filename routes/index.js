
const express = require('express')
const Controller = require('../Controllers/controller')
const authentication  = require('../middlewares/auth')
const  authorization  = require('../middlewares/authorization')
const { errorHandler } = require('../middlewares/errorHandler')
const router = express.Router()





router.post('/register', Controller.handleRegister)
router.post('/login', Controller.handleLogin)
router.post('/googleLogin', Controller.googleLogin)
router.get('/articles', Controller.articleBasket)
router.get('/teams',authentication,Controller.teamsBasket)
router.get('/statistic-live-match',authentication,authorization,Controller.basketBallLiveMatch)
router.patch('/subscribe',authentication,Controller.subscribe)
router.post('/tokenMidTrans', authentication,Controller.midtransToken)
router.use(errorHandler)



module.exports = router