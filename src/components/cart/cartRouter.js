const router =  require("express").Router();
const cartController = require("./cartController");

/*************************** GET methods ***************************/
//render cart page
router.get("/", cartController.render);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/
// router.get("/delete/:productID", cartController.deleteProduct);

module.exports = router;