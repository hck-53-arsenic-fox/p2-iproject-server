const express = require('express')
const router = express.Router()
const controller = require('../controllers/doctors')


router.get('/', controller.getAllDoctor)
router.get('/:id', controller.getDetailDoctor)

module.exports = router