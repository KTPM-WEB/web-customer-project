const userModel = require("../components/auth/authModel")

module.exports.getNumberProduct = async (userID) => {
    var number_product = 0;

    if (userID) {
        const user = await userModel.findById(userID);
        for (let i = 0, len = user.cart.length; i < len; i++) {
            number_product += user.cart[i].quantity;
        }
    }

    return number_product;
}