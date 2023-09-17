const mongoose = require("mongoose");

const productModel = mongoose.model("product", {
  name: { type: String, required: true, trim: true },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) throw new Error("Price must be a non-negative number");
    },
  },
  newPrice: { type: Number },
  discount: { type: Number },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = productModel;
