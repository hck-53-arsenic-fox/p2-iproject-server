const express = require('express');
const Controller = require('../controllers/controllerMusic');
const router = express.Router();

router.get('/', Controller.getMusic);
router.post('/', Controller.addMusic);
router.delete('/:id', Controller.delMusic);


module.exports = router;