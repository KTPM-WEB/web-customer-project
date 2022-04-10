const productService = require('./productService');

/************************************* GET methods *************************************/
/**
 * render the product page
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.render = async (req, res) => {
    try {
        res.render("product/views/products", {active: {Shop: true}});
    } catch (err) {
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
    try {
        const product = await productService.getProductByID(req.params.id);
        const review = await productService.getAllReviewByProductID(req.params.id);
        const relatedProduct = await productService.getRelatedList(product.category);
        res.render("product/views/product_detail", {product: product, review: review, relatedProduct: relatedProduct});
    } catch (err) {
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
