const cartService = require("./cartService");
const userModel = require("../auth/authModel")

/*************************** GET methods ***************************/
// Render cart page
exports.render = async (req, res) => {
    console.log("render cart");
    console.log("req.user", req.user);
    const user = await userModel.findById(req.user._id);
    const products = await cartService.getProducts(user.cart);

    console.log('-------');
    console.log("user", user);

    const total = user.total;
    const subtotal = 0;

    // console.log("products", products);

    res.render("cart/views/cart", { active: { Cart: true }, page: "cart", products, subtotal, total });
};
