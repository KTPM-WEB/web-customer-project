const express = require("express");
const router = express.Router();
const shopController = require("./shopController");

/*************************** GET methods ***************************/
//render shop page
router.get("/", shopController.render);

//render shop page
router.get("/detail", shopController.rederDetail);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;