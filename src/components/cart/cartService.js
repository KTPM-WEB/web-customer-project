const productModel = require("../product/model/productModel");
const userModel = require("../user/userModel");

module.exports.getProducts = async (cart) => {
    try{
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
    }catch (err){
        throw err;
    }

}

module.exports.deleteProduct = async (userID, productID) => {
    try {
        const user = await userModel.findById(userID).lean();
        let number_of_quantity_delete = 0;
        // product exist in cart
        let itemIdx = user.cart.findIndex(item => item.productID === productID);

        if (itemIdx > -1) {
            // product exist in cart, delete quantity
            // console.log("delete quantity");
            number_of_quantity_delete = user.cart[itemIdx].quantity;

            // console.log("number_of_quantity_delete:", number_of_quantity_delete);
            // console.log('user.total:', user.total);
            // console.log('user.cart[itemIdx].total:', user.cart[itemIdx].total);

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