const checkoutService = require("../../components/checkout/check-outService");
const userService = require("../../components/user/userService");

/**
 * get order history
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getOrder = async (req, res) => {
    try {
        const orders = await userService.getUserOrder(req.user._id);
        res.send(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/**
 * delete order
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteOrder = async (req, res) => {
    try {
        await checkoutService.deleteOrderById(req.params.orderID);
        res.status(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

/**
 * get profile of user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getProfile = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user._id);
        res.send(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.changePass = async (req, res) => {
    try {
        console.log("-- change pass --");
        console.log("req.body:", req.body);
        console.log("req.user:", req.user);

        const stt = await userService.changePassword(req.user._id, req.body.old_pass, req.body.new_pass);

        console.log("stt:", stt);

        res.send({ stt });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.editProfile = async (req, res) => {
    try {
        if (req.user==null)
        {
            res.status(401).json({"message":"UnAuthorized"})
            return;
        }

        await userService.updateUser(req.user.username,req.body.field,req.body.new_val)
        res.send({})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}