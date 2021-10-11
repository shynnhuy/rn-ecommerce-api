const { Router } = require("express");
const router = Router();

router.use("/auth", require("./auth.routes"));
router.use("/products", require("./product.routes"));
router.use("/order", require("./order.routes"));

router.use("/manager", require("./manager.routes"));
router.use("/notifications", require("./notification.routes"));

module.exports = router;
