const express = require('express')
const app = express()
const router = express.Router()
const user = require("./user")
const movie = require("./movie")

router.use('/user',user)
router.use('/movie',movie)

module.exports=router