const express = require('express')
const router = express.Router()
const controller = require('../controllers/transations')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')


router.get('/', authentication, controller.getAllTransaction)
router.get('/:id', authentication,authorization, controller.detailTransaction)
router.delete('/:id', authentication, authorization ,controller.deleteData)
router.put('/:id', authentication, authorization ,controller.editForm)
router.post('/:doctorId', authentication ,controller.bookingDoctor)


module.exports = router