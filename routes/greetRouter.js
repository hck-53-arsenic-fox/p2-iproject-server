const express = require('express');
const Controller = require('../controllers/controllerGreet');
const { authentication } = require('../middleware/auth');
const router = express.Router();

router.get('/', Controller.getGreet);
router.post('/:id', Controller.addGreet);


module.exports = router;