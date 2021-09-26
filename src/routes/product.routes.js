const { Router } = require("express");
const productControllers = require("../controllers/product.controllers");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.post("/category", productControllers.createCategory);
router.get("/:id", productControllers.getProduct);
router.post("/", authenticate, productControllers.createProduct);
router.get("/", productControllers.getProducts);

module.exports = router;
