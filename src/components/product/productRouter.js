const express = require("express");
const router = express.Router();
const productController = require("./productController");

/*************************** GET methods ***************************/
//render products page
router.get("/", productController.render);

//render product-detail page
router.get("/:id", productController.renderDetail);

/*************************** POST methods ***************************/
router.post("/:id/reviews",productController.postReview);

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;