const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require('multer');

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router