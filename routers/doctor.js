const express = require('express')
const DoctorController = require('../controllers/doctorController')
const authentication = require('../middleware/auth')
const router = express.Router()

router.post('/login', DoctorController.login)
router.get('/profile', authentication, DoctorController.fetchDoctor)

module.exports = router