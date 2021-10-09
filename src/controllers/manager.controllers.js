const { User, Product, Order } = require("../models");
const expo = require("../utils/expo");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find().select("-password");

      //   console.log(users);
      res.json({ success: true, result: users });
    } catch (error) {}
  },
  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.find();

      res.json({ success: true, result: products });
    } catch (error) {}
  },

  getAllOrders: async (req, res, next) => {
    try {
      const orders = await Order.find()
        .populate({
          path: "user",
          select: "-password",
        })
        .populate("products.product");

      res.json({ success: true, result: orders });
    } catch (error) {
      next(error);
    }
  },

  changeOrderStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // console.log(status);
      const newOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      const { pushToken } = await User.findById(newOrder.user);

      if (pushToken) {
        expo.sendPushNotification(pushToken, {
          title: `Hi ${newOrder.name}`,
          body:
            status === "shipping"
              ? `Your package from your order #${newOrder._id} is being shipped.`
              : `Your order #${newOrder._id} has been cancelled.`,
        });
      }

      res.json({ success: true, result: newOrder });
    } catch (error) {
      next(error);
    }
  },
};
