const orderModel = require("./orderModel");
const userModel = require("../user/userModel");
const promoModel = require("../cart/promoModel");
const ls = require("local-storage");

/**
 * order
 * @param user {object}
 * @param promo
 * @returns {Promise<*>}
 */
module.exports.order = async (user, promo = null) => {
    let pro;
    try {
        console.log("--- order ---");
        console.log("user:", user);

        const products = [];
        const now = (new Date()).toString().split(" ");

        for (let i = 0; i < user.cart.length; i++) {
            const product = {
                product_id: user.cart[i].productID,
                quantity: user.cart[i].quantity
            }
            products.push(product);
        }

        if (products.length > 0) {
            let order = {
                username: user.username,
                timestamp: Date.now(),
                create_date: now[2] + ' ' + now[1] + ',' + now[3],
                products: products,
                status: "Processing",
                customer: {
                    _id: user._id,
                    fullname: user.fullname,
                    address: user.address,
                    phone: user.phone,
                    email: user.email
                }
            }

            // case: has promo
            if (promo !== null) {
                order.promo = promo.discount;
                pro = await promoModel.findOne({ code: promo.code }).lean();

                await promoModel.findOneAndUpdate(
                    { code: promo.code },
                    {
                        $set: {
                            slot: pro.slot - 1
                        }
                    });
            }

            console.log("order:", order);

            await orderModel.create(order);

            if (user._id == 'undefined') {
                ls.set("cart", JSON.stringify([]));
                ls.set("total", JSON.stringify(0));
            } else {
                await userModel.findByIdAndUpdate({ _id: user._id }, {
                    $set: {
                        cart: [],
                        total: 0
                    }
                });
            }

            return true;
        } else
            return false;
    } catch (err) {
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
    } catch (err) {
        throw err;
    }
}