const productService = require('./productService');

/*************************** GET methods ***************************/
// Render product page
exports.render = async (req, res) => {
    const page = parseInt(req.query.page)||1;
    const perPage = 9;
    const start = (page - 1) * perPage;
    const end = page * perPage;

    const products = (await productService.getAllProducts());

    res.render("product/views/products", {active: {Shop:true}, page:"shop", products:products.slice(start, end), length:products.length, lengthPage:parseInt(products.length/9)});
};

// Render product detail page
exports.renderDetail = (req, res) => {
    res.render("product/views/product_detail");
};