const orderModel = require("./checkoutModel");
const userModel = require("../auth/authModel");

module.exports.order = async (user) => {
    console.log("--- order ---");

    console.log("user", user);
    // get datetime
    const now = (new Date()).toString().split(" ");

    var products = [];
    for (let i = 0; i < user.cart.length; i++) {
        const product = {
            product_id: user.cart[i].productID,
            quantity: user.cart[i].quantity
        }
        products.push(product);
    }

    var order = {
        customer_id: user._id,
        create_date: now[2] + ' ' + now[1] + ',' + now[3],
        products: products,
        status: "In Progress"
    }

    console.log("order:", order);

    await orderModel.create(order);

    // delete products in cart
    await userModel.findByIdAndUpdate({ _id: user._id },
        {
            $set: {
                cart: []
            }
        });
}