const express = require("express")
const router = express.Router()
const controller = require('../controllers/halodoc')
const {slow, limiter} = require("../utils/limit-options")


router.get("/medicine/categories", slow, limiter, controller.medicineCategories)

module.exports = router