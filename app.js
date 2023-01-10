const express = require("express");
const app = express();
const port = 3000;
const router = require("./router");
const { errorHandler } = require("./helpers/helpers");

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Running on port ${port}`);
});
