const cartService = require("../../cart/cartService")
const userService = require("../../user/userService");
const productService = require("../../product/productService");

exports.getProducts = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.user._id);

        const products = await cartService.getProducts(user.cart);

        let total = 0;
        var number_products = 0;

        console.log("products:", products);
        for (let i = 0; i < products.length; i++) {
            total = Math.round((total + products[i].total) * 100) / 100;
            number_products += products[i].quantity;
        }

        console.log("send products:", products);

        req.session.number_product = number_products;

        res.send({ number_products, total, products });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.changeQuantity = async (req, res) => {
    try {
        console.log("--- cart api: change quantity ---");

        const user = await userService.getUserByID(req.user._id);
        const products = user.cart;

        // product index in cart
        let itemIdx = products.findIndex(item => item.productID === req.params.productID);

        // product exist in cart, update quantity
        if (itemIdx > -1) {
            if (req.params.type === 'plus') {
                products[itemIdx].quantity += 1;
                req.session.number_product += 1;
            } else if (req.params.type === 'minus') {
                products[itemIdx].quantity -= 1;
                req.session.number_product -= 1;
            } else {
                let number = 0;
                products[itemIdx].quantity = parseInt(req.body.quantity);

                products.forEach(product => {
                    number += product.quantity;
                })

                req.session.number_product = number;
            }

            if (products[itemIdx].quantity < 1) {
                products[itemIdx].quantity = 1;
            }

            const product = await productService.getProductByID(req.params.productID);

            products[itemIdx].total = parseInt(products[itemIdx].quantity) * parseFloat(product.price);
        }


        let total = 0;

        for (let i = 0; i < products.length; i++) {
            total += parseFloat(products[i].total);
        }

        // round total
        total = Math.round(total * 100) / 100;

        await userService.updateCart(user._id, products, total);

        let number_product = req.session.number_product;
        let product_quantity = products[itemIdx].quantity;
        let product_total = Math.round(products[itemIdx].total * 100) / 100;

        res.send({ number_product, total, product_quantity, product_total });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        console.log("--- products api delete product from cart ---");

        const user = await cartService.deleteProduct(req.user._id, req.params.productID);

        console.log("send user:", user);

        res.send(user.cart);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}