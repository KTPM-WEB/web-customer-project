const router = require("express").Router();
const authController = require("./authApiController")

router.post("/username", authController.checkUserName);
router.post("/email", authController.checkEmail);


module.exports = router;