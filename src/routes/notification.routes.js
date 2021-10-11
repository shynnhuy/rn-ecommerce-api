const { Router } = require("express");
const notiControllers = require("../controllers/notification.controllers");
const authenticate = require("../middlewares/authenticate");
const router = Router();

router.get("/:id", notiControllers.getNotification);
router.get("/", authenticate, notiControllers.getMyNotifications);
router.patch("/:id", authenticate, notiControllers.changeOrderIsRead);

module.exports = router;
