const express = require("express");
const router = express.Router();
const userController = require("./userController");


/*************************** GET methods ***************************/
//render products page
router.get("/profile", userController.renderProfile);

router.get("/order", userController.renderOrder);

/*************************** POST methods ***************************/
router.post("/profile/edit", userController.editProfile)

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;