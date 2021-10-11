const { Router } = require("express");
const orderControllers = require("../controllers/order.controllers");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.get("/user", authenticate, orderControllers.getUserOrder);
router.get("/:id", orderControllers.getOrder);
router.post("/payment-intent", orderControllers.createPaymentIntent);
router.post("/", authenticate, orderControllers.createOrder);

module.exports = router;
