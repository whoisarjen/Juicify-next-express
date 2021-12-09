const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favourite_productSchema = new Schema({
  product_ID: {
    type: String,
    required: [true, "required!"],
  },
  user_ID: {
    type: String,
    required: [true, "required!"],
  },
});

const favourite_product = mongoose.model(
  "favourite_product",
  favourite_productSchema
);

module.exports = favourite_product;
