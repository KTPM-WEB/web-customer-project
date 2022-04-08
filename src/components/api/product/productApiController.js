const productService = require("../../product/productService");
const productUtils = require("../../product/productUtils");

exports.search = async (req, res) => {
    try {
        let payload = req.body.payload.trim();
        let search = await productService.getProductByName(payload);

        res.send({ payload: search });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.renderByName = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const getProducts = await productService.getProductByName(req.query.name);
        const products = productUtils.paging(getProducts, page);
        products.name = req.query.name;
        res.json(products);
    }catch (err){
        res.status(500).json({message: err.message});
    }
};

exports.renderByField = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const getProducts = await productService.getProductByField(req.query.field, req.query.type);
        const products = productUtils.paging(getProducts, page);
        products.field = req.query.field;
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        console.log("--- products api add to cart ---");
        console.log("req.body", req.body);
        console.log("req.user", req.user);

        req.session.user = await productService.addToCart(req.body.id, req.user._id);
        req.session.number_product += 1;

        console.log("req.user:", req.user);
        res.status(200);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}