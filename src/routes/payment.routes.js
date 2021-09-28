const { Router } = require("express");
const paymentControllers = require("../controllers/payment.controllers");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.post("/intent", paymentControllers.createPaymentIntent);

module.exports = router;
