const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {active: {Home:true}, page:"home"});
});

module.exports = router;
