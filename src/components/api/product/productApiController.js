const productService = require("../../product/productService");
const productUtils = require("../../product/productUtils");

exports.renderByField = async (req, res) => {
    try {
        const {field, value} = req.params;
        console.log(field, value);

        const page = parseInt(req.query.page) || 1;
        const products = (await productService.getProductByField());
        const data = productUtils.paging(products, page);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.search = async (req, res) => {
    try {
        let payload = req.body.payload.trim();
        let search = await productService.getProductByName(payload);
        search = search.slice(0, 10);
        res.send({payload: search});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.getdata = async (req, res) => {
    try {
        let search = await productService.getAllProducts();
        search = search.slice(0, 10);
        res.send({payload: search});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};