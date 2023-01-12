const express = require('express')
const DoctorController = require('../controllers/doctorController')
const {authenticationDoctor, authentication} = require('../middleware/auth')
const router = express.Router()

router.post('/login', DoctorController.login)
router.get('/profile', authentication, DoctorController.fetchDoctor)
router.get('/detail', authenticationDoctor, DoctorController.findDoctor)
router.get('/appointment', authenticationDoctor, DoctorController.findAppointment)


module.exports = router