const Stripe = require("stripe");

const { STRIPE_SEC } = process.env;

const stripe = Stripe(STRIPE_SEC, { apiVersion: "2020-08-27" });

module.exports = {
  createPaymentIntent: async (req, res, next) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 120000,
        currency: "VND",
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
};
