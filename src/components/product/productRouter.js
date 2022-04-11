const router = require("express").Router();
const productController = require("./productController");

/*************************** GET methods ***************************/
//render products page
router.get("/", productController.render);

//render products page
router.get("/name", productController.render);

//render product-detail page
router.get("/:id", productController.renderDetail);

/*************************** POST methods ***************************/
// post review to product

// //add products to cart
// router.post("/", productController.addToCart);

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;