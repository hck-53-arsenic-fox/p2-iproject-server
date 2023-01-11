const express = require('express')
const router = express.Router()
const patientRouter = require('./patient')
const doctorRouter = require('./doctor')

router.use('/pub', patientRouter)
router.use('/doctor', doctorRouter)


module.exports = router