const { Router } = require("express");
const authControllers = require("../controllers/auth.controllers");

const router = Router();

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);

module.exports = router;
