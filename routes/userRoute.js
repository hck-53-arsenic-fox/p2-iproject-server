const UserController = require('../controllers/userController')
const app = require('express')
const route = app.Router()
const authentication = require('../middlewares/authentication')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "userProfileImage",
  },
});

const upload = multer({ storage: storage });

route.get('/', authentication, UserController.getUser)
route.get("/search", authentication, UserController.search)

route.post('/register', upload.single("image"), UserController.register)
route.post('/login', UserController.login)
module.exports = route;