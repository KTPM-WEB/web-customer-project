const { reviewPaging } = require('../../public/js/paging');
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
        const limit = 3
        const productID = req.params.id

        //get product info
        const products = await productService.getProductByID(productID);

        //get totalPage by the number of reviews
        let reviews = await productService.getAllReviewByProductID(productID)
        const totalPage=Math.ceil(reviews.length/limit);

        //slice within limit
        reviews = Object.values(reviews)
        reviews = reviews.slice(0,limit)

        let order=null
        let enableReview = null

        //check buy product
        if (req.user)
        {
            order = await productService.isBuy(req.user._id, productID)
            if (order.length !== 0)
            enableReview = true
        }

        const buffer = reviewPaging(productID,totalPage,1)
        const relatedProduct = await productService.getRelatedList(products.category);
        
        res.render("product/views/product_detail", {product: products, review: reviews, buffer: buffer, relatedProduct: relatedProduct , enableReview: enableReview});
    } catch (err) {
        res.status(500).json({message: err.message});
    }

};

/************************************* POST methods *************************************/
/**
 * add to cart
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.addToCart = async (req, res) => {
    try{
        req.session.user = await productService.addToCart(req.body.id, req.user._id);
        req.session.number_product += 1;
        res.redirect('/product');
    }catch (err) {
        res.status(500).json({message: err.message});
    }
}
