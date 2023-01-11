const { application } = require('express')
const express = require('express')
const PatientController = require('../controllers/patientController')
const authentication = require('../middleware/auth')
const router = express.Router()

router.post('/register', PatientController.register )
router.post('/login', PatientController.login)
router.get('/patient', authentication, PatientController.fetchPatient)
router.post('/google-login', PatientController.googleLogin)
router.post('/appointment/:doctorId', authentication, PatientController.addAppointment)
router.post('/payment', authentication, PatientController.payment)

module.exports = router