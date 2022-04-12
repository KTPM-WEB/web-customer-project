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
        res.render("checkout/views/checkout", {
            active: { Checkout: true },
            page: "checkout"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};