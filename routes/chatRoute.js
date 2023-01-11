const express = require("express");
const ChatController = require("../controllers/chatController");

const router = express.Router();

router.post("/", ChatController.accessChat);
router.get("/", ChatController.fetchChat);

router.post("/group", ChatController.createGroupChat);
router.put("/group", ChatController.renameGroup);
router.put("/groupadd", ChatController.addToGroup);
router.put("/groupremove", ChatController.removeFromGroup);

module.exports = router;
