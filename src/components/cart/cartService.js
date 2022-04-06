const productModel = require("../product/productModel")

module.exports.getProducts = async (cart) => {
    console.log("get products");
    const productsID = await cart.map(item => item.productID);

    console.log("productsID", productsID);
    var products = [];

    for (let i = 0; i < productsID.length; i++) {
        const product = await productModel.findById(productsID[i]);


        if (product) {
            product.quantity = cart[i].quantity;
            product.total = product.price * cart[i].quantity;
            products.push(product);

        }
    }

    return products;
}