const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const product = new Schema({
    name: String,
    price: Number,
    brand: String,
    size: [String],
    color: [String],
    category: String,
    thumb: String,
    img: [String],
    SKU: String,
    introduction: String,
    infomation: String,
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model("product", product, "product");
