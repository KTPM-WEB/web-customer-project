const productService = require("../../components/product/productService");
const pagination = require("../../public/js/paging");

/**
 * search name of product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.search = async (req, res) => {
    try {
        const payload = req.body.payload.trim();
        const search = await productService.getProductByName(payload);
        res.send({payload: search});
    } catch (err) {
        res.status(500).json({message: err.message});
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
        const products = pagination.paging(getProducts, page, 6);
        products.field = req.query.field;
        products.type = req.query.type;
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message});
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
        req.session.user = await productService.addToCart(req.body.id, req.user._id, req.body.quantity);
        req.session.number_product += parseInt(req.body.quantity);
        const number = req.session.number_product;
        res.send({number});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

/**
 * post comment
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postReview = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({message: "UnAuthorized"})
            return;
        }

        const content = req.body.content
        const productID = req.params.productID
        const createAt = Date.now();

        if (content.length === 0) {
            res.status(400)
            return;
        }

        await productService.createReview(req.user.fullname, productID, content, createAt)
        const reviews = await productService.getAllReviewByProductID(productID)
        res.send({reviews: reviews})
    } catch (err) {
        res.status(500).json({message: err.message})
    }

}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.switchPage = async (req, res) => {
    try {
        const limit = 3
        const productID = req.params.productID
        const page = parseInt(req.query.page)

        let reviews = await productService.getAllReviewByProductID(productID)
        reviews = Object.values(reviews)

        let start = (page - 1) * limit;
        let end = page * limit;

        if (end >= reviews.length)
            end = reviews.length

        reviews = reviews.slice(start, end)
        res.send({reviews: reviews})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}