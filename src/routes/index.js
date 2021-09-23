const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth.routes"));
router.use("/products", require("./product.routes"));

module.exports = router;
