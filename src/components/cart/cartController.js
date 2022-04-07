const cartService = require("./cartService");
const userModel = require("../auth/authModel");
const productModel = require("../product/model/productModel")

/*************************** GET methods ***************************/
// Render cart page
exports.render = async (req, res) => {
    console.log("render cart");
    const user = await userModel.findById(req.user._id);
    // const products = await cartService.getProducts(user.cart);

    // console.log('-------');
    // console.log("user", user);

    const total = user.total;

    res.render("cart/views/cart", { active: { Cart: true }, page: "cart", total });
};


module.exports.deleteProduct = async (req, res) => {
    console.log("delete product");

    const number_of_quantity_delete = await cartService.deleteProduct(req.user._id, req.params.productID);
    req.session.number_product -= number_of_quantity_delete;

    res.redirect("/cart");
}