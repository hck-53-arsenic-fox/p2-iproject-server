const express = require('express');
const router = express.Router()
const ControllerPlace = require('../controllers/placeController.js');

router.post('/', ControllerPlace.getPlaces);

module.exports = router
