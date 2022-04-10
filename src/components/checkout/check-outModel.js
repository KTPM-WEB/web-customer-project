const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const order = new Schema({
    customer_id: String,
    create_date: String,
    products: [{
        product_id: String,
        quantity: Number
    }],
    promo: String,
    status: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('order', order, 'order');