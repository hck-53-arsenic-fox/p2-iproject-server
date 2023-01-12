const express = require('express')
const UserController = require('../Controller/UserController')
const { authentication } = require('../Middleware/Authentication')
const router = express.Router()

router.post('/register',UserController.register)
router.post('/login',UserController.login)
router.post('/generate-mid-trans-token',authentication,UserController.midtransPayment)
router.patch('/status',authentication,UserController.updateStatus)
// router.post('/googleLogin',UserController.googleLogin)

// router.get('/showAnime',Controller.showAnime)
module.exports=router