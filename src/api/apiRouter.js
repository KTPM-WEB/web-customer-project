const router = require("express").Router();

const productApiRouter = require("./product/productApiRouter");
const cartApiRouter = require("./cart/cartApiRouter");
const userApiRouter = require("./user/userApiRouter");
const authApiRouter = require("./auth/authApiRouter");
const checkoutApiRouter = require("./checkout/checkoutApiRouter");

router.use('/products', productApiRouter);
router.use('/cart', cartApiRouter);
router.use('/user', userApiRouter);
router.use('/auth', authApiRouter);
router.use('/checkout', checkoutApiRouter);

module.exports = router;