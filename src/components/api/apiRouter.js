const router = require("express").Router();

const productApiRouter = require("./product/productApiRouter");

router.use('/products', productApiRouter);

module.exports = router;