const express = require("express");
const router = express.Router();
const authController = require("./authController");

/*************************** GET methods ***************************/
//render login page
router.get("/login", authController.renderLogin);

//render register page
router.get("/register", authController.renderRegister);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;