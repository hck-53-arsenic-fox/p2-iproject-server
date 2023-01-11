require("dotenv").config();
const express = require("express");
const cors = require("cors");
const CustomerController = require("./controllers/customerController");
const router = require("./routes");
const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);
app.get("/", CustomerController.getProducts);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
