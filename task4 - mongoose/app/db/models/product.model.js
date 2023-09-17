const mongoose = require("mongoose");

const productModel = mongoose.model("product", {
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = productModel;
