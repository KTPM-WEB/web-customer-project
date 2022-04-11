const cartService = require("../cart/cartService");
const checkoutService = require("./check-outService");
const userService = require("../user/userService");

/*************************** GET methods ***************************/
/**
 * change check out page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.render = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user._id);
        const products = await cartService.getProducts(user.cart);

        if (req.session.promo === undefined)
            res.render("checkout/views/checkout", {
                active: { Checkout: true },
                page: "checkout",
                products,
                total: Math.round(user.total * 100) / 100,
                result: Math.round(user.total * 100) / 100
            });
        else
            res.render("checkout/views/checkout", {
                active: { Checkout: true },
                page: "checkout",
                products,
                discount: req.session.promo.discount_total,
                total: Math.round(user.total * 100) / 100,
                result: Math.round(((Math.round(user.total * 100) / 100) - req.session.promo.discount_total) * 100) / 100,
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
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

        if (req.session.promo !== undefined) {
            await checkoutService.order(user, req.session.promo);
            req.session.promo = undefined;
        } else
            await checkoutService.order(user);

        req.session.number_product = 0;
        res.redirect("/?checkout=true");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}