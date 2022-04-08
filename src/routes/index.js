const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const indexService = require("./indexService")

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

  res.render('index', { number_product });
});

module.exports = router;
