const userModel = require('./userModel');
const orderModel = require("../checkout/check-outModel");
const productModel = require("../product/model/productModel");
const cloudinary = require('../../config/cloudinary.config');
const bcrypt = require("bcrypt")

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
 *  change password of user
 *
 * @param newPass {string}
 * @param id {string}
 * @param oldPass
 * @returns {Promise<void>}
 */
module.exports.changePassword = async (id, oldPass, newPass) => {
    try {
        const user = await userModel.findById(id)

        if (!bcrypt.compareSync(oldPass, user.password)) {
            return 'err400';
        }

        await bcrypt.hash(newPass, 4).then(async (hash) => {
            await userModel.findOneAndUpdate(
                { _id: id },
                { $set: { password: hash } });
        });
        return 'succ200';
    } catch (err) {
        throw err;
    }

};

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
                products[j].price = Math.round(product.price * 100) / 100;
                products[j].img = product.img[0];
                products[j].total = Math.round(products[j].price * products[j].quantity * 100) / 100;
                total += products[j].total;
            }

            orders[i].thumb = products[0].img;
            orders[i].total = Math.round(total * 100) / 100;
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

/**
 *  change avatar of user
 *
 * @param file {object}
 * @param id {string}
 * @returns {Promise<void>}
 */
module.exports.changeAvatar = async (id, file) => {
    try {
        console.log("file.path: ", file.path);
        // upload image
        if (!file) return;
        console.log(file);
        const url = await cloudinary.upload(file.path, 'user_avatar');
        await userModel.findByIdAndUpdate(id, { avatar_url: url });
    } catch (err) {
        throw err;
    }
};
