const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')


router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/google-sign-in',controller.loginGoogle)




module.exports = router