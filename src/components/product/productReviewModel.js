const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * Schema
 */
const productReview = new Schema({
        userName: String,
        productID: String,
        content: String,
        createdAt: Date

}, {
        versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model("reviews", productReview, "reviews");
