const router = require("express").Router();
const userRoute = require("./userRouter");
const { authentication } = require("../middleware/auth");
const movieRoute = require("./movieRouter");
const midtrans = require("./midtrans");

// app.get('/', function(req, res){
//     res.send({ title: 'GeeksforGeeks' });
// });

router.use("/users", userRoute);
router.use("/", movieRoute);
router.use(authentication);
router.use("/midtrans", midtrans);

module.exports = router;
