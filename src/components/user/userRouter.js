const express = require("express");
const router = express.Router();
const userController = require("./userController");

/*************************** GET methods ***************************/
//render products page
router.get("/profile", userController.displayProfile);

/*************************** POST methods ***************************/


/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;