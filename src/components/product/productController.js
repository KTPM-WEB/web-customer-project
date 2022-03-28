const productService = require('./productService');
const productUtils = require('./productUtils');
const {ObjectId} = require('mongodb')

const PAGE_SIZE = 9;

/*************************** GET methods ***************************/
// Render product page
exports.render = async (req, res) => {
    const page = parseInt(req.query.page)||1;
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const products = (await productService.getAllProducts());
    const totalPage=parseInt(products.length/9);

    const buffer = await productUtils.paging(totalPage,page);

    res.render("product/views/products", {active: {Shop:true}, page: page, products:products.slice(start, end), buffer:buffer, totalProduct:products.length, totalPage:totalPage});
};

// Render product detail page
exports.renderDetail = async (req, res) => {
    const product= await productService.getProductByID(ObjectId(req.params.id));
    res.render("product/views/product_detail",{product:product});
};