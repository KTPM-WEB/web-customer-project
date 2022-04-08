const router = require("express").Router();
const controller = require("./productApiController");

// router.get("/", controller.renderByField);

router.post("/add/:productID", controller.addToCart);

router.post("/search", controller.search);

router.get("/field", controller.renderByField);

module.exports = router;

