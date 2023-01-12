const express = require('express');
const router = express.Router()
const userRoute = require('./userRoute');
const placeRoute = require('./placeRoute');
const bookmarkRoute = require('./bookmarkRoute');
const weatherRoute = require('./weatherRoute');
const authentication = require('../middlewares/auth');

router.use('/user', userRoute);
router.use('/places', placeRoute);
router.use('/weather', weatherRoute)
router.use('/bookmark', authentication, bookmarkRoute);

module.exports = router