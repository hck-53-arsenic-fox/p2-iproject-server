const express = require('express')
const app = express()
const router = express.Router()
const user = require("./user")
const movie = require("./movie")
const qrCode = require('./qrCode')

router.use('/user',user)
router.use('/movie',movie)
router.use('/',qrCode)

module.exports=router