const userModel = require('../auth/authModel');
const orderModel = require("../checkout/checkoutModel");
const productService = require("../product/productService");

/**
 * get user by ID
 * @param userID {string}
 * @returns {Promise<*>}
 */
module.exports.getUserByID = (userID) => {
    try {
        return userModel.findById(userID).lean();
    } catch (err) {
        throw err;
    }
}


module.exports.getUserOrder = async (userID) => {
    try {
        console.log("--- user service get order ---");
        const orders = await orderModel.find({ customer_id: userID }).lean();



        for (let i = 0; i < orders.length; i++) {
            var total = 0;
            var products = orders[i].products;

            for (let j = 0; j < products.length; j++) {
                const product = await productService.getProductByID(products[j].product_id);

                products[j].name = product.name;
                products[j].price = product.price;
                products[j].img = product.img[0];
                products[j].total = products[j].price * products[j].quantity;
                total += products[j].total;
            }

            orders[i].thumb = products[0].img;
            orders[i].total = total;
        }

        console.log("orders: ", orders);

        return orders;

    } catch (err) {
        throw err;
    }
}


/**
 * display profile page
 * @param username
 * @param field
 * @param new_value
 * @returns {Promise<*>}
 */
module.exports.updateUser = (username, field, new_value) => {
    try {
        return userModel.findOneAndUpdate({ username: username }, { $set: { [field]: new_value } }, { new: true });
    } catch (err) {
        throw err;
    }
}