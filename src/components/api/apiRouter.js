const router = require("express").Router();

const productApiRouter = require("./product/productApiRouter");
const cartApiRouter = require("./cart/cartApiRouter")
const userApiRouter = require("./user/userApiRouter")
const authApiRouter = require("./auth/authApiRouter")

router.use('/products', productApiRouter);
router.use('/cart', cartApiRouter);
router.use('/user', userApiRouter);
router.use('/auth', authApiRouter);

module.exports = router;