const express = require('express')
const router = express.Router()
const controllerMovie = require('../controllers/controllerMovie')

router.get('/allmovie',controllerMovie.read)

module.exports=router