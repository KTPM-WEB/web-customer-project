const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    googleId: String,
    fullname: String,
    username: String,
    password: String,
    email: String,
    role: String,
    employed: String,
    avatar_url: String,
    address: String,
    phone: String,
    intro: String,
    total: Number,
    confirm: Boolean,
    cart: [{
        productID: String,
        quantity: Number,
        total: String
    }]
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('user', user, 'user');