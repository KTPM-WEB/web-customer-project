const express = require("express");
const router = express.Router();
const contactController = require("./contactController");

/*************************** GET methods ***************************/
//render contact page
router.get("/", contactController.render);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;