const cartService = require("../cart/cartService");
const checkoutService = require("./checkoutService");
const userModel = require("../auth/authModel");
const { check } = require("express-validator");

/*************************** GET methods ***************************/
// Render check out page
exports.render = async (req, res) => {
    console.log("render cart");
    const user = await userModel.findById(req.user._id);
    const products = await cartService.getProducts(user.cart);

    // console.log('-------');
    // console.log("user", user);

    const total = user.total;
    const subtotal = 0;

    // console.log("products", products);

    res.render("checkout/views/checkout", { active: { Checkout: true }, page: "checkout", products, subtotal, total });
};

exports.placeOrder = async (req, res) => {
    console.log("place order");
    console.log("req.body:", req.body);
    console.log("req.user:", req.user);

    const user = await userModel.findById(req.user._id);

    await checkoutService.order(user);

    // set product in cart = 0
    req.session.number_product = 0;

    res.redirect("/?checkout=true");
}