const router = require("express").Router();
const userApiController = require("./userApiController");

router.get("/profile", userApiController.getProfile);
router.get("/order", userApiController.getOrder);

router.post("/profile/change-pass", userApiController.changePass);
router.post("/profile/edit", userApiController.editProfile);

router.delete("/order/delete/:orderID", userApiController.deleteOrder);

module.exports = router;