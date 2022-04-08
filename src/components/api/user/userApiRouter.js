const router = require("express").Router();
const userApiController = require("./userApiController");

router.get("/profile", userApiController.getProfile);

router.get("/order", userApiController.getOrder);

router.delete("/order/delete/:orderID", userApiController.deleteOrder);
module.exports = router;