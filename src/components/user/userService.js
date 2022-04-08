const userModel = require('./userModel');
const orderModel = require("../checkout/check-outModel");
const productModel = require("../product/model/productModel");

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

/**
 * get user order by ID
 * @param userID {string}
 * @returns {Promise<*>}
 */
module.exports.getUserOrder = async (userID) => {
    try {
        const orders = await orderModel.find({ customer_id: userID }).lean();

        for (let i = 0; i < orders.length; i++) {
            let total = 0;
            let products = orders[i].products;

            for (let j = 0; j < products.length; j++) {
                const product = await productModel.findById(products[j].product_id).lean();

                products[j].name = product.name;
                products[j].price = product.price;
                products[j].img = product.img[0];
                products[j].total = products[j].price * products[j].quantity;
                total += products[j].total;
            }

            orders[i].thumb = products[0].img;
            orders[i].total = total;
        }
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

/**
 * display profile page
 * @param id
 * @param cart
 * @param total
 * @returns {Promise<*>}
 */
module.exports.updateCart = async (id, cart, total) => {
    try {
        await userModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    cart: cart,
                    total: total
                }
            });
    } catch (err) {
        throw err;
    }
}

/**
 * check if user exist
 * @param username{string}
 * @returns {Promise<*>}
 */
module.exports.checkUserName = async (username) => {
    try {
        return await userModel.findOne({ username: username });
    } catch (err) {
        throw err;
    }
}

/**
 * check if gmail exist
 * @param email{string}
 * @returns {Promise<*>}
 */
module.exports.checkEmail = async (email) => {
    try {
        return await userModel.findOne({ email: email });
    } catch (err) {
        throw err;
    }
}