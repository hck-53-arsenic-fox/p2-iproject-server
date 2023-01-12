const express = require('express')
const router = express.Router()
const user = require('./User')
const anime=require('./AnimeList')



router.use('/users', user)
router.use('/anime',anime)


module.exports = router