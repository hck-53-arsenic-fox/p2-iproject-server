const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');

cloudinary.config({
    cloud_name: "da0v7uhvw",
    api_key: "417353184118227",
    api_secret: "Iu5MsDtLXjFSPlCb7NyzPh4dRYk",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "userProfileImage",
    },
});
const upload = multer({ storage: storage });


router.post('/register', upload.single("imgProfile"),UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/following', UserController.getAllFavorites)
router.patch('/status', UserController.changeStatusPro)
router.get('/:username', UserController.getUserProfile)
router.post('/:PlayerId', UserController.addFavoritePlayer)

module.exports = router