const Stripe = require("stripe");
const { Order } = require("../models");

const { STRIPE_SEC } = process.env;

const stripe = Stripe(STRIPE_SEC, { apiVersion: "2020-08-27" });

module.exports = {
  createPaymentIntent: async (req, res, next) => {
    try {
      const { price } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(`${price}00`),
        currency: "USD",
        payment_method_types: ["card"],
      });

      const clientSec = paymentIntent.client_secret;
      res.send({
        success: true,
        result: clientSec,
      });
    } catch (error) {
      next(error);
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { name, address, total, products, paid } = req.body;
      const newOrder = new Order({
        name,
        total,
        products,
        address,
        paid,
        user: _id,
      });
      const savedOrder = await newOrder.save();

      res.json({ success: true, message: `Order #${savedOrder._id} is saved` });
    } catch (error) {
      next(error);
    }
  },

  getUserOrder: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const orders = await Order.find({ user: _id }).populate(
        "products.product"
      );

      res.json({ success: true, result: orders });
    } catch (error) {
      next(error);
    }
  },
};
