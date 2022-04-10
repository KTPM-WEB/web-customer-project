const router = require("express").Router();
const authController = require("./authApiController")

router.post("/username", authController.checkUserName);
router.post("/email", authController.checkEmail);
router.post("/signup", authController.signup);

module.exports = router;