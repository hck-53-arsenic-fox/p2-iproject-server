const express = require("express");
const router = express.Router();
const Controller = require("../controllers/contollersRoom");

router.get("/room", Controller.fetchDataRoom);
router.get("/room/:id", Controller.detailRoomById);

module.exports = router;
