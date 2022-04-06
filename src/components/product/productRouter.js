const express = require("express");
const router = express.Router();
const productController = require("./productController");

/*************************** GET methods ***************************/
//render products page
router.get("/", productController.render);

//render product-detail page
router.get("/:id", productController.renderDetail);

/*************************** POST methods ***************************/
// post review to product
router.post("/:id/reviews", productController.postReview);

//add products to cart
router.post("/", productController.addToCart);

//render product-detail page
router.post("/search", productController.search);

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;