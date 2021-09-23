const { Router } = require("express");
const authControllers = require("../controllers/auth.controllers");
const authorize = require("../middlewares/authorize");

const router = Router();

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);
router.patch("/", authorize, authControllers.updateInfo);

module.exports = router;
