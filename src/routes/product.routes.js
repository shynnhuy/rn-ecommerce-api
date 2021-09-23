const { Router } = require("express");
const productControllers = require("../controllers/product.controllers");
const authorize = require("../middlewares/authorize");

const router = Router();

router.post("/category", productControllers.createCategory);
router.get("/:id", productControllers.getProduct);
router.post("/", authorize, productControllers.createProduct);
router.get("/", productControllers.getProducts);

module.exports = router;
