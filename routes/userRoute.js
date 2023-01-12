const UserController = require('../controllers/userController')
const app = require('express')
const route = app.Router()
const authentication = require('../middlewares/authentication')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // cloud_name: "dtxdzq9i5",
  api_key: process.env.CLOUDINARY_API_KEY,
  // api_key: "317147444593755",
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // api_secret: "x0-ZOoa-kExi1U10R30sk8fbN0w",
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