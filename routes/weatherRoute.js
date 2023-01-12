const express = require('express');
const router = express.Router()
const ControllerWeather = require('../controllers/weatherController.js');

router.post('/', ControllerWeather.getWeather)

module.exports = router