const productService = require("../../components/product/productService");
const pagination = require("../../public/js/paging");
const ls = require("local-storage");
const {memoryStorage} = require("multer");


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
        res.send({ payload: search });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
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
        console.log("--- add to cart ---");
        console.log("req.body: ", req.body);
        let number = 0;

        if (req.user) {
            req.session.user = await productService.addToCart(req.body.id, req.user._id, req.body.quantity);
            req.session.number_product += parseInt(req.body.quantity);
            number = req.session.number_product;
        } else {
            // req.session.user = await productService.addToCart(req.body.id);

            await productService.addToCart(req.body.id, undefined, req.body.quantity);
            console.log("add success");

            req.session.number_product += parseInt(req.body.quantity);
            number = req.session.number_product;
        }

        res.send({ number });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
        let fullName = null
        if (req.user)
            fullName = req.user.fullname

        let id = null
        if (req.user)
            id = req.user._id

        const content = req.body.content
        const productID = req.params.productID
        const createAt = Date.now();

        // review with empty content
        if (content.length === 0) {
            res.status(400).json({message: "Content is required"})
            return;
        }

        //review with empty name
        if (!fullName && req.body.stranger_name.length === 0) {
            res.status(400).json({message: "Name is required"})
            return;
        }

        //create review in mongo
        await productService.createReview(id, fullName,req.body.stranger_name, productID, content, createAt)

        //paging and slice data
        const all_reviews = await productService.getAllReviewByProductID(productID)
        const result = pagination.reviewPaging(all_reviews,1)

        res.send({ reviews: result.data, buffer: result.buffer })

    } catch (err) {
        res.status(500).json({ message: err.message })
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
        const productID = req.params.productID
        const page = parseInt(req.query.page||1)

        let reviews = await productService.getAllReviewByProductID(productID)
        const result = pagination.reviewPaging(reviews, page)

        res.send({ reviews: result.data, buffer: result.buffer })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}