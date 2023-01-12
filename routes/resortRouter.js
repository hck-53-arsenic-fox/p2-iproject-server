const express = require('express')
const router = express.Router()
const ResortController = require('../controllers/resortController')
const authentication = require('../middleware/authentication')


//? Multer
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

router.get('/', ResortController.readResorts)
router.post('/', upload.single('image'), authentication, ResortController.createResort)
router.get('/:id', ResortController.readOneResort)
router.post('/:id', authentication, ResortController.resortReviews)



module.exports = router