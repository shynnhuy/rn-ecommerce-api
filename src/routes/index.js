const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth.routes"));
router.use("/products", require("./product.routes"));
router.use("/payment", require("./payment.routes"));

module.exports = router;
