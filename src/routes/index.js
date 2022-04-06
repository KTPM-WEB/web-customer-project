const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const indexService = require("./indexService")

/* GET home page. */
router.get('/', async (req, res, next) => {

  console.log('render /');
  console.log("/ user:", req.user);

  var number_product = 0;

  if (req.user) {
    number_product = await indexService.getNumberProduct(req.user._id);
  }

  req.session.number_product = number_product;

  res.render('index', { number_product });
});

module.exports = router;
