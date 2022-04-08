const router = require("express").Router();

const productApiRouter = require("./product/productApiRouter");
const cartApiRouter = require("./cart/cartApiRouter")
const userApiRouter = require("./user/userApiRouter")

router.use('/products', productApiRouter);
router.use('/cart', cartApiRouter);
router.use('/user', userApiRouter);

module.exports = router;