const { Router } = require("express");
const productControllers = require("../controllers/product.controllers");
const authenticate = require("../middlewares/authenticate");
const upload = require("../utils/upload");

const router = Router();

router.post("/category", productControllers.createCategory);
router.get("/categories", productControllers.getCategories);
router.post("/rating", authenticate, productControllers.ratingProduct);
router.post(
  "/",
  authenticate,
  upload.array("images"),
  productControllers.createProduct
);
router.get(
  "/:product/rating",
  authenticate,
  productControllers.getProductRating
);
router.get("/:id", productControllers.getProduct);
router.get("/", productControllers.getProducts);

module.exports = router;
