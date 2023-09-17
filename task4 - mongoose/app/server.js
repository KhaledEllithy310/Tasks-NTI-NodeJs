require("./db/connect");
const express = require("express");
const productRouter = require("./routes/product.routes");
const path = require("path");
const hbs = require("hbs");
const app = express();

const staticDir = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../resources/views");
const partialDir = path.join(__dirname, "../resources/layouts");
app.use(express.urlencoded({ extended: true }));

app.use(productRouter);
app.use(express.static(staticDir));
app.set("views", viewDir);
app.set("view engine", "hbs");
hbs.registerPartials(partialDir);

app.get("*", (req, res) => {
  res.render("err404");
});

module.exports = app;
