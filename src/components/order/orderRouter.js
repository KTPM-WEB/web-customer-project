const router = require("express").Router();
const orderController = require("./orderController");

/*************************** GET methods ***************************/
//render check out page
router.get("/", orderController.render);

/*************************** POST methods ***************************/
// place order
router.post("/", orderController.placeOrder);


module.exports = router;