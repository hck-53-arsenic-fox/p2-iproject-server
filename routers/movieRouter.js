const movieController = require("../controllers/movieController");
const router = require("express").Router();
const { authentication } = require('../middleware/auth')


router.get("/", movieController.getMovie);
router.get("/:id", authentication, movieController.getDetail);

module.exports = router;