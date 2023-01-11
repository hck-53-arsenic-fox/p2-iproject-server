const express = require("express");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.get("/makes", ProductController.getMakes);
router.get("/types", ProductController.getTypes);
router.get("/years", ProductController.getYears);
router.get("/cars", ProductController.getCars);
router.post("/buy", ProductController);

// router.use(authentication);

module.exports = router;
