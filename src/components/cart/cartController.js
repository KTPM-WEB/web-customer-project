const cartService = require("./cartService");
const userService = require("../user/userService");

/*************************** GET methods ***************************/
/**
 * render the cart page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.render = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user._id);
        const total = user.total;
        res.render("cart/views/cart", { active: { Cart: true }, page: "cart", total });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports.deleteProduct = async (req, res) => {
    try {
        const number_of_quantity_delete = await cartService.deleteProduct(req.user._id, req.params.productID);
        req.session.number_product -= number_of_quantity_delete;
        res.redirect("back");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}