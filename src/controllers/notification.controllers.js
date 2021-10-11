const { Notification } = require("../models");

module.exports = {
  getMyNotifications: async (req, res, next) => {
    try {
      const notifications = await Notification.find({
        receiver: req.user._id,
      }).sort({ createdAt: "desc" });
      res.json({ success: true, result: notifications });
    } catch (error) {
      next(error);
    }
  },
  getNotification: async (req, res, next) => {
    try {
      const { id } = req.params;
      const notify = await Notification.findById(id);
      res.json({ success: true, result: notify });
    } catch (error) {
      next(error);
    }
  },
  changeOrderIsRead: async (req, res, next) => {
    try {
      const { id } = req.params;
      const newOrder = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
      );
      res.json({ success: true, result: newOrder });
    } catch (error) {
      next(error);
    }
  },
};
