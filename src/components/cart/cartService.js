const productModel = require("../product/model/productModel");
const userModel = require("../auth/authModel");

module.exports.getProducts = async (cart) => {
    console.log("get products");
    const productsID = await cart.map(item => item.productID);

    console.log("productsID", productsID);
    var products = [];

    for (let i = 0; i < productsID.length; i++) {
        const product = await productModel.findById(productsID[i]);

        if (product) {
            product.quantity = cart[i].quantity;
            product.total = Math.round(product.price * cart[i].quantity * 100) / 100;
            products.push(product);
        }
    }

    return products;
}

module.exports.deleteProduct = async (userID, productID) => {
    try {
        var user = await userModel.findById(userID);
        var number_of_quantity_delete = 0;
        console.log("user:", user);

        // product exist in cart
        let itemIdx = user.cart.findIndex(item => item.productID == productID);
        console.log("itemIdx: " + itemIdx);

        if (itemIdx > -1) {
            // product exist in cart, delete quantity
            console.log("delete quantity");
            number_of_quantity_delete = user.cart[itemIdx].quantity;

            console.log("number_of_quantity_delete:", number_of_quantity_delete);
            console.log('user.total:', user.total);
            console.log('user.cart[itemIdx].total:', user.cart[itemIdx].total);

            const product = await productModel.findById(productID);

            user.total = Math.round((user.total - user.cart[itemIdx].quantity * product.price) * 100) / 100;
            user.cart.splice(itemIdx, 1);

            await userModel.findByIdAndUpdate({ _id: userID }, { $set: { cart: user.cart, total: user.total } });

        } else {
            throw Error("product not exist in cart");
        }

        return number_of_quantity_delete;
    } catch (err) {
        console.log("Err:", err);
    }
}