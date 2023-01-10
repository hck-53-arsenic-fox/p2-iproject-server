const express = require('express')
const Controller = require('../Controllers/controller')
const router = express.Router()

router.post('/register', Controller.handleRegister)



module.exports = router