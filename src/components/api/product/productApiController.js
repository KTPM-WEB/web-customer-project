const productService = require("../../product/productService");
const productUtils = require("../../product/productUtils");

exports.renderByField = async (req, res) => {
    try {
        const { field, value } = req.params;
        console.log(field, value);

        const page = parseInt(req.query.page) || 1;
        const products = (await productService.getProductByField());
        const data = productUtils.paging(products, page);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.search = async (req, res) => {
    try {
        let payload = req.body.payload.trim();
        let search = await productService.getProductByName(payload);
        search = search.slice(0, 10);
        res.send({ payload: search });
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