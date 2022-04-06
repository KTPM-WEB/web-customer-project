const cartService = require("./cartService");
const userModel = require("../auth/authModel");
const productModel = require("../product/productModel")

/*************************** GET methods ***************************/
// Render cart page
exports.render = async (req, res) => {
    console.log("render cart");
    const user = await userModel.findById(req.user._id);
    const products = await cartService.getProducts(user.cart);

    // console.log('-------');
    // console.log("user", user);

    const total = user.total;
    const subtotal = 0;

    // console.log("products", products);

    res.render("cart/views/cart", { active: { Cart: true }, page: "cart", products, subtotal, total });
};

exports.updateCart = async (req, res) => {
    console.log("update cart");
    console.log("req.body:", req.body);
    console.log("req.body.quan:", req.body.quantity);

    var user = await userModel.findById(req.user._id);
    var total = 0;
    var delete_product = [];
    var number_product_in_cart = 0;

    for (let i = 0; i < user.cart.length; i++) {
        console.log("i:", i);
        if (req.body.quantity[i] == 0) {
            console.log("remove:", user.cart[i].productID);
            delete_product.push(user.cart[i].productID);
            continue;
        }

        user.cart[i].quantity = parseInt(req.body.quantity[i]);
        const product = await productModel.findById(user.cart[i].productID);

        number_product_in_cart += user.cart[i].quantity;
        total = Math.round((total + product.price * user.cart[i].quantity) * 100) / 100;
    }

    console.log("total: ", total);

    // update product quantity
    await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $set: {
                cart: user.cart,
                total: total
            }
        });

    // delete product has quantity = 0;
    for (let i = 0; i < delete_product.length; i++) {
        await cartService.deleteProduct(req.user._id, delete_product[i]);
    }

    req.session.number_product = number_product_in_cart;
    res.redirect("back");
}


module.exports.deleteProduct = async (req, res) => {
    console.log("delete product");

    const number_of_quantity_delete = await cartService.deleteProduct(req.user._id, req.params.productID);
    req.session.number_product -= number_of_quantity_delete;

    res.redirect("/cart");
}