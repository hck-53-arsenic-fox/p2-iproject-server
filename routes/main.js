const router = require("express").Router();
const controllerMain = require("../controllers/controllerMain");
const { authentication } = require("../middleware/auth");

router.get("/artworks", authentication, controllerMain.fetchArtwork);
router.get("/exhibitions", authentication, controllerMain.fetchExhibitions);
router.post(
  "/generate-midtrans-token/:eventId",
  authentication,
  controllerMain.midtrans
);
router.post(
  "/transaction/:eventId",
  authentication,
  controllerMain.buyTicketEvent
);

module.exports = router;
