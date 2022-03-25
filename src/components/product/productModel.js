const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const productSchema = new Schema(
    {
        color: String,
        name: String,
        price: Number,
        img: { type: String },
        category: String,
        brand: String,
        size: String,
    }
);

module.exports = mongoose.model("product", productSchema, "product");
