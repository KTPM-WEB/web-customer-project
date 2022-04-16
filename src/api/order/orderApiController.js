const orderService = require("../../components/order/orderService");
const cartService = require("../../components/cart/cartService")
const userService = require("../../components/user/userService")
const ls = require("local-storage");

/**
 * get checkout
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getCheckout = async (req, res) => {
    try {
        let result;
        let discount = undefined;
        let total = undefined;
        let products = undefined;
        let user = undefined;

        if (req.user) {
            user = await userService.getUserByID(req.user._id);
            products = await cartService.getProducts(user.cart);
            total = user.total
        } else {
            const cart = JSON.parse(ls.get("cart"));
            products = await cartService.getProducts(cart);
            total = JSON.parse(ls.get("total"));
        }

        if (req.session.promo === undefined)
            result = Math.round(total * 100) / 100
        else {
            discount = req.session.promo.discount_total
            result = Math.round(((Math.round(total * 100) / 100) - req.session.promo.discount_total) * 100) / 100;
        }

        total = Math.round(total * 100) / 100;

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
        console.log("--- place order ---");
        console.log("req.body: ", req.body);
        if (req.body === undefined || req.body.fullname === '' || req.body.address === '' || req.body.phone === '' || req.body.email === '') {
            res.send({ msg: "lack-info" });
            return;
        }

        console.log("pass check");

        let canCheckout = false;
        let cart = JSON.parse(ls.get("cart"));
        let user = {};

        if (req.user)
            user._id = req.user._id;
        else
            user._id = 'undefined';

        console.log("user._id: ", user._id);
        user.fullname = req.body.fullname;
        console.log("user.fullname: ", user.fullname);
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.cart = cart;

        console.log("user:", user);

        if (req.session.promo !== undefined) {
            await orderService.order(user, req.session.promo);
            req.session.promo = undefined;
        } else if (req.user) {
            canCheckout = await orderService.order(user);
        } else
            canCheckout = await orderService.order(user);

        req.session.number_product = 0;

        res.send({ canCheckout });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}