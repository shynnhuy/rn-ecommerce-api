const { Router } = require("express");
const authControllers = require("../controllers/auth.controllers");
const authenticate = require("../middlewares/authenticate");
const upload = require("../utils/upload");

const router = Router();

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);
router.post("/refresh", authControllers.refresh);
router.patch(
  "/avatar",
  authenticate,
  upload.single("image"),
  authControllers.updateAvatar
);
router.patch("/", authenticate, authControllers.updateInfo);

module.exports = router;
