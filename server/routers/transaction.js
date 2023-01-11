const express = require("express");
const router = express.Router();
const Controller = require("../controllers/contollersTransaction");
const {authetication} = require('../middlewares/auth')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');

cloudinary.config({
    cloud_name: "dcbdbvpoj",
    api_key: "888229724611886",
    api_secret: "mjjZOvlGYDF_WuW6QTbwctERLWY",
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "BlackDoorz_EKTP",
    },
  });
  const upload = multer({ storage: storage });

router.get("/transactions", authetication, Controller.fetchDataTransactions)
router.patch("/transactions/:id", authetication, Controller.handleStatus);
router.post("/transactions/:room", authetication, Controller.AddTransaction)
router.post("/identityUsers/:id", authetication, upload.single("image"), Controller.handleIdentity)
router.post("/createMidtransToken/:price", authetication, Controller.createTokenMidtrans)

module.exports = router;
