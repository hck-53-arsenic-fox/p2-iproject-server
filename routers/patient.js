
const express = require('express')
const PatientController = require('../controllers/patientController')
const {authentication} = require('../middleware/auth')
const router = express.Router()

router.post('/register', PatientController.register )
router.post('/login', PatientController.login)
router.post('/google-login', PatientController.googleLogin)
router.get('/patient', authentication, PatientController.getPatient)
router.post('/payment', authentication, PatientController.payment)
router.put('/appointment', authentication, PatientController.editAppointment)
router.get('/appointment', authentication, PatientController.getAppointment)
router.post('/appointment/:doctorId', authentication, PatientController.addAppointment)

module.exports = router