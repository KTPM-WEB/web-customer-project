const productService = require('./productService');
const productUtils = require('./productUtils');
const { ObjectId } = require('mongodb')

const PAGE_SIZE = 9;

/*************************** GET methods ***************************/
// Render product page
exports.render = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const products = (await productService.getAllProducts());
    const totalPage = parseInt(products.length / 9);

    const buffer = await productUtils.paging(totalPage, page);

    const categories = await productService.getDistinctByField("category");
    const brands = await productService.getDistinctByField("brand");
    const relate = await productService.getRelatedList("Clothing");

    res.render("product/views/products", { active: { Shop: true }, page: page, products: products.slice(start, end), categories: categories, brands: brands, buffer: buffer, totalProduct: products.length, totalPage: totalPage });
};

// Render product detail page
exports.renderDetail = async (req, res) => {
    const product = await productService.getProductByID(ObjectId(req.params.id));
    const review = await productService.getAllReviewByProductID(req.params.id);
    const relatedProduct = await productService.getRelatedList(product.category)
    res.render("product/views/product_detail", { product: product, review: review, relatedProduct: relatedProduct });
};

module.exports.postReview = async (req, res) => {
    if (!req.user)
        res.redirect('/auth/login')
    else {
        productService.createReview(req.user.username, req.body.productID, req.body.content)
        res.redirect('/product/' + req.body.productID)
    }
}

module.exports.addToCart = async (req, res) => {
    console.log("controller add to cart");
    console.log("req.body", req.body);
    console.log("req.user", req.user);

    const update_user = await productService.addToCart(req.body.id, req.user._id);

    req.session.user = update_user;
    req.session.number_product += 1;

    console.log("req.user:", req.user);

    res.redirect('/product');
}