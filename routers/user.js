const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/controllerUser')

router.post('/register',controllerUser.register)
router.post('/login',controllerUser.login)

module.exports=router
