const userModel = require("../../auth/authModel");
const checkoutModel = require("../../checkout/checkoutModel");
const userService = require("../../user/userService");

exports.getOrder = async (req, res) => {
    console.log("--- user api get order ---");

    const orders = await userService.getUserOrder(req.user._id);

    res.send(orders);
}

exports.deleteOrder = async (req, res) => {
    console.log("--- user api delete order ---");
    console.log("req.params.orderID:", req.params.orderID);

    await checkoutModel.findByIdAndDelete(req.params.orderID);

    res.status(200);
}

exports.getProfile = async (req, res) => {
    console.log("--- user api get profile ---");

    const user = await userModel.findById(req.user._id).lean();

    console.log("user: ", user);

    res.send(user);

}

