const { User, Product } = require("../models");

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
};
