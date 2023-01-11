const express = require('express')
const router = express.Router()
const controllerQrcode = require('../controllers/controllerQrcode')

router.post('/genQr/:id',controllerQrcode.generateQr)

module.exports=router