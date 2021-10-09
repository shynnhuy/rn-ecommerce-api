const { Router } = require("express");
const managerControllers = require("../controllers/manager.controllers");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = Router();

router.use(authenticate);
router.use(authorize("Admin"));

router.get("/users", managerControllers.getAllUsers);
router.get("/products", managerControllers.getAllProducts);
router.patch("/orders/:id", managerControllers.changeOrderStatus);
router.get("/orders", managerControllers.getAllOrders);

module.exports = router;
