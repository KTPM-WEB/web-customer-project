const express = require("express");
const router = express.Router();
const cartController = require("./cartController");

/*************************** GET methods ***************************/
//render cart page
router.get("/", cartController.render);

/*************************** POST methods ***************************/
router.post("/update", cartController.updateCart);

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/
// router.get("/delete/:productID", cartController.deleteProduct);

module.exports = router;