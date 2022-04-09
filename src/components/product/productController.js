const productService = require('./productService');
const productUtils = require('./productUtils');

/************************************* GET methods *************************************/
/**
 * render the product page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.render = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const products = (await productService.getAllProducts());
        const data = productUtils.paging(products, page);
        res.render("product/views/products", {
            active: {Shop: true},
            page: page,
            products: data,
            totalProduct: products.length
        });
    }catch (err){
        res.status(500).json({message: err.message});
    }
};

/**
 * render product detail page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.renderDetail = async (req, res) => {
    try{
        const product = await productService.getProductByID(req.params.id);
        const review = await productService.getAllReviewByProductID(req.params.id);
        const relatedProduct = await productService.getRelatedList(product.category)
        res.render("product/views/product_detail", {product: product, review: review, relatedProduct: relatedProduct});
    }catch (err) {
        res.status(500).json({message: err.message});
    }

};

/************************************* POST methods *************************************/
/**
 * post review
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.postReview = async (req, res) => {
    try{
        if (!req.user)
            res.redirect('/auth/login')
        else {
            await productService.createReview(req.user.username, req.body.productID, req.body.content)
            res.redirect('/product/' + req.body.productID)
        }
    }catch (err) {
        res.status(500).json({message: err.message});
    }
}

// /**
//  * add to cart
//  * @param req
//  * @param res
//  * @returns {Promise<*>}
//  */
// module.exports.addToCart = async (req, res) => {
//     try{
//         console.log("controller add to cart");
//         console.log("req.body", req.body);
//         console.log("req.user", req.user);
//
//         req.session.user = await productService.addToCart(req.body.id, req.user._id);
//         req.session.number_product += 1;
//
//         console.log("req.user:", req.user);
//
//         res.redirect('/product');
//     }catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }
