const router = require("express").Router();
const checkoutApiController = require("./checkoutApiController");

router.get("/", checkoutApiController.getCheckout);
router.post("/place-order", checkoutApiController.placeOrder);

module.exports = router;