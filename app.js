if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 4444;
const cors = require("cors");
const ControllerUser = require("./controllers/controllerUser");
const router = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use("/public", express.static("./src"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
