const router = require("express").Router();

const productApiRouter = require("./product/productApiRouter");
const cartApiRouter = require("./cart/cartApiRouter")

router.use('/products', productApiRouter);

router.use('/cart', cartApiRouter);

module.exports = router;