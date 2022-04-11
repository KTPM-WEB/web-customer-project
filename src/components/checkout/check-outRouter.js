const router = require("express").Router();
const checkoutController = require("./check-outController");

/*************************** GET methods ***************************/
//render check out page
router.get("/", checkoutController.render);

/*************************** POST methods ***************************/
// place order
router.post("/order", checkoutController.placeOrder);


module.exports = router;