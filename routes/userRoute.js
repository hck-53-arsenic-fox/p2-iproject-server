const express = require('express');
const router = express.Router()
const ControllerUser = require('../controllers/userController.js');

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/googleLogin', ControllerUser.googleLogin)

module.exports = router