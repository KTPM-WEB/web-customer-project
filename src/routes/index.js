const express = require('express');
const router = express.Router();
const indexService = require("./indexService")
const productService = require("../components/product/productService");

/* GET home page. */
router.get('/', async (req, res, next) => {
  var number_product = 0;

  if (req.user) {
    number_product = await indexService.getNumberProduct(req.user._id);
  }

  req.session.number_product = number_product;

  if (req.query.checkout === "true") {
    res.render('index', { number_product, message: "Place order successful" });
  }

  const products = (await productService.getAllProducts()).slice(0, 8);

  res.render('index', { number_product, products });
});

module.exports = router;
