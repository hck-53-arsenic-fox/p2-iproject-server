const express = require('express')
const router = express.Router()
const ResortController = require('../controllers/resortController')
const authentication = require('../middleware/authentication')


//? Multer
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

router.get('/', ResortController.readResorts)
router.post('/', ResortController.createResort)
router.get('/:id', upload.single('image'), authentication, ResortController.readOneResort)


module.exports = router