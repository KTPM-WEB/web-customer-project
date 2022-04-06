const router = require("express").Router();
const controller = require("./productApiController");

// router.get("/", controller.renderByField);

router.post("/search", controller.search);

module.exports = router;

