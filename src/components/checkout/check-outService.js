const orderModel = require("./check-outModel");
const userModel = require("../user/userModel");

/**
 * order
 * @param user {object}
 * @returns {Promise<*>}
 */
module.exports.order = async (user) => {
    try {
        const now = (new Date()).toString().split(" ");

        const products = [];
        for (let i = 0; i < user.cart.length; i++) {
            const product = {
                product_id: user.cart[i].productID,
                quantity: user.cart[i].quantity
            }
            products.push(product);
        }

        const order = {
            customer_id: user._id,
            create_date: now[2] + ' ' + now[1] + ',' + now[3],
            products: products,
            status: "Processing"
        }

        await orderModel.create(order);
        await userModel.findByIdAndUpdate({_id: user._id}, {$set: {cart: []}});
    }catch (err) {
        throw err;
    }
}

/**
 * register
 * @param id {string}
 * @returns {Promise<*>}
 */
module.exports.deleteOrderById = async (id) => {
    try {
        await orderModel.findByIdAndDelete(id);
    }catch (err) {
        throw err;
    }
}