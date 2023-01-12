const express = require("express");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);

router.get("/games", ProductController.getGames);
router.get("/games/:slug", ProductController.getDetails);
router.use(authentication);
router.post("/games/:slug", ProductController.buyGame);
router.post("/midtrans-token", ProductController.generateMidtransToken);

module.exports = router;
