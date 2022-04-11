const productModel = require("../product/model/productModel");
const promoModel = require("./promoModel");
const userModel = require("../user/userModel");

/**
 * delete a product from the cart
 * @param cart{Object}
 * @returns {Promise<*>}
 */
module.exports.getProducts = async (cart) => {
    try {
        const productsID = await cart.map(item => item.productID);

        const products = [];
        for (let i = 0; i < productsID.length; i++) {
            const product = await productModel.findById(productsID[i]).lean();

            if (product) {
                product.quantity = cart[i].quantity;
                product.total = Math.round(product.price * cart[i].quantity * 100) / 100;
                products.push(product);
            }
        }
        return products;
    } catch (err) {
        throw err;
    }
}

/**
 * delete a product from the cart
 * @param userID{String}
 * @param productID{String}
 * @returns {Promise<*>}
 */
module.exports.deleteProduct = async (userID, productID) => {
    try {
        const user = await userModel.findById(userID).lean();
        let itemIdx = user.cart.findIndex(item => item.productID === productID);
        if (itemIdx > -1) {
            const product = await productModel.findById(productID);
            user.total = Math.round((user.total - user.cart[itemIdx].quantity * product.price) * 100) / 100;
            user.cart.splice(itemIdx, 1);
            await userModel.findByIdAndUpdate({ _id: userID }, { $set: { cart: user.cart, total: user.total } });
        }
        return user;
    } catch (err) {
        throw err;
    }
}

/**
 * get promotion
 * @param promoCode{string}
 * @returns {Promise<*>}
 */
module.exports.getPromo = async (promoCode) => {
    try {
        return await promoModel.findOne({code: promoCode}).lean();
    } catch (err) {
        throw err;
    }
}

/**
 * update promotion
 * @param promoCode{string}
 * @returns {Promise<*>}
 */
module.exports.usePromo = async (promoCode) => {
    try {
        const promo = await promoModel.findOne({ code: promoCode }).lean();
        await promoModel.findOneAndUpdate(
            { code: promoCode },
            {
                $set: {
                    slot: promo.slot - 1
                }
            });
    } catch (err) {
        throw err;
    }
}