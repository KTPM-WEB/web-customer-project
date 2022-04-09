const productService = require("../../product/productService");
const productUtils = require("../../product/productUtils");

/**
 * search name of product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.search = async (req, res) => {
    try {
        let payload = req.body.payload.trim();
        let search = await productService.getProductByName(payload);
        res.send({ payload: search });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * render product detail
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.render = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const getProducts = await productService.getAllProducts();
        const products = productUtils.paging(getProducts, page);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * render product by field
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.renderByField = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const getProducts = await productService.getProductByField(req.query.field, req.query.type);
        const products = productUtils.paging(getProducts, page);
        products.field = req.query.field;
        products.type = req.query.type;
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * add product to cart
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.addToCart = async (req, res) => {
    try {
        console.log("service add to cart");
        req.session.user = await productService.addToCart(req.body.id, req.user._id, req.body.quantity);

        req.session.number_product += parseInt(req.body.quantity);

        const number = req.session.number_product;

        console.log("req number:", req.session.number_product);
        res.send({ number });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}