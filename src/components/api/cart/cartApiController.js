const cartService = require("../../cart/cartService")
const userService = require("../../user/userService");
const productService = require("../../product/productService");

exports.getProducts = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user._id);

        const products = await cartService.getProducts(user.cart);

        let total = 0;

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
        const user = await productService.getProductByID(req.user._id);

        const products = user.cart;

        // product index in cart
        let itemIdx = products.findIndex(item => item.productID === req.params.productID);

        // product exist in cart, update quantity
        if (itemIdx > -1) {
            if (req.params.type === 'plus') {
                products[itemIdx].quantity += 1;
            } else {
                products[itemIdx].quantity -= 1;
                if (products[itemIdx].quantity < 1) {
                    products[itemIdx].quantity = 1;
                }
            }
            const product = await productService.getProductByID(req.params.productID);

            products[itemIdx].total = products[itemIdx].quantity * product.price;
        }


        let total = 0;

        console.log("products:", products);
        for (let i = 0; i < products.length; i++) {
            total += parseFloat(products[i].total);
        }

        // round total
        total = Math.round(total * 100) / 100;

        await userService.updateCart(user._id, products, total);

        console.log("send products:", products);
        console.log("total:", total);

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