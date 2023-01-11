const router = require("express").Router();
const controllerMain = require("../controllers/controllerMain");
const { authentication } = require("../middleware/auth");

router.get("/artworks", controllerMain.fetchArtwork);
router.get("/exhibitions", controllerMain.fetchExhibitions);
router.post(
  "/generate-midtrans-token",
  authentication,
  controllerMain.midtrans
);

module.exports = router;
