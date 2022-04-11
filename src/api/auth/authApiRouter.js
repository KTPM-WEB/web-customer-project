const router = require("express").Router();
const authController = require("./authApiController")

router.post("/username", authController.checkUserName);
router.post("/email", authController.checkEmail);
router.post("/signup", authController.signup);
router.post("/change-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
module.exports = router;