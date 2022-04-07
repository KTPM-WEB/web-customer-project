const router = require("express").Router();
const controller = require("./cartApiController");


router.get("/products", controller.getProducts);

router.post("/change-quantity", controller.changeQuantity);

router.delete("/delete/:productID", controller.deleteProduct);

module.exports = router;