const express = require("express");
const { UserController } = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/", UserController.registerUser);
router.get("/", authentication, UserController.getAllUsers);
router.put("/", authentication, UserController.updatePic);
router.post("/login", UserController.loginUser);
router.get("/:id", UserController.getOneUser);

module.exports = router;
