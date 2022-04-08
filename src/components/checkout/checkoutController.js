const cartService = require("../cart/cartService");
const checkoutService = require("./checkoutService");
const userService = require("../user/userService");

/*************************** GET methods ***************************/
/**
 * change check out page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.render = async (req, res) => {
    try{
        const user = await userService.getUserByID(req.user._id);
        const products = await cartService.getProducts(user.cart);
        res.render("checkout/views/checkout", {
            active: {Checkout: true},
            page: "checkout",
            products,
            subtotal: 0,
            total: user.total
        });
    }catch (err){
        res.status(500).json({message: err.message});
    }
};

/**
 * order confirmation page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.placeOrder = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user._id);
        await checkoutService.order(user);
        req.session.number_product = 0;
        res.redirect("/?checkout=true");
    }catch (err){
        res.status(500).json({message: err.message});
    }
}