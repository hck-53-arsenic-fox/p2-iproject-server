const express = require('express');
const router = express.Router()
const ControllerUser = require('../controllers/userController.js');

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

module.exports = router