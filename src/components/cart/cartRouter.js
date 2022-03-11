const express = require("express");
const router = express.Router();
const cartController = require("./cartController");

/*************************** GET methods ***************************/
//render cart page
router.get("/", cartController.render);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;