const express = require("express");
const router = express.Router();
const shopController = require("./shopController");

/*************************** GET methods ***************************/
//render shop page
router.get("/", shopController.render);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;