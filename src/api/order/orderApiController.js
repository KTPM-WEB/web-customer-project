const orderService = require("../../components/order/orderService");
const cartService = require("../../components/cart/cartService")
const userService = require("../../components/user/userService")

/**
 * get checkout
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getCheckout = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user._id);
        const products = await cartService.getProducts(user.cart);
        let result;
        let discount = undefined;

        if (req.session.promo === undefined)
            result = Math.round(user.total * 100) / 100
        else {
            discount = req.session.promo.discount_total
            result = Math.round(((Math.round(user.total * 100) / 100) - req.session.promo.discount_total) * 100) / 100;
        }

        const total = Math.round(user.total * 100) / 100;

        res.send({ products, total, result, discount, user });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/**
 * get checkout
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.placeOrder = async (req, res) => {
    try {
        if (req.body === undefined || req.body.fullname === '' || req.body.address === '' || req.body.phone === '' || req.body.email === '') {
            res.send({ msg: "lack-info" });
            return;
        }

        let canCheckout = false;
        const user = await userService.getUserByID(req.user._id);

        user.fullname = req.body.fullname;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.email = req.body.email;

        if (req.session.promo !== undefined) {
            await orderService.order(user, req.session.promo);
            req.session.promo = undefined;
        } else
            canCheckout = await orderService.order(user);

        req.session.number_product = 0;

        res.send({ canCheckout });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}