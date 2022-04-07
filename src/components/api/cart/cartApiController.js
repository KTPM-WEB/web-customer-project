const cartService = require("../../cart/cartService")
const userModel = require("../../auth/authModel");

exports.getProducts = async (req, res) => {
    try {
        console.log("--- cart api: get products ---");
        const user = await userModel.findById(req.user._id).lean();

        const products = await cartService.getProducts(user.cart);

        var total = 0;

        console.log("products:", products);
        for (let i = 0; i < products.length; i++) {
            total = Math.round((total + products[i].total) * 100) / 100;
        }

        console.log("send products:", products);
        res.send({ total, products });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.changeQuantity = async (req, res) => {
    try {
        console.log("--- cart api: change quantity ---");
        const user = await userModel.findById(req.user._id).lean();

        const products = await cartService.getProducts(user.cart);

        var total = 0;

        console.log("products:", products);
        for (let i = 0; i < products.length; i++) {
            total = Math.round((total + products[i].total) * 100) / 100;
        }

        console.log("send products:", products);
        res.send({ total, products });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        console.log("--- products api delete product from cart ---");
        console.log("req.user:", req.user);
        console.log("req.params:", req.params);

        const user = await cartService.deleteProduct(req.user._id, req.params.productID);


        console.log("send user:", user);
        res.send(user.cart);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}