const express = require("express");
const router = express.Router();
const checkoutController = require("./checkoutController");

/*************************** GET methods ***************************/
//render check out page
router.get("/", checkoutController.render);

/*************************** POST methods ***************************/
// place order
router.post("/order", checkoutController.placeOrder);



/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;