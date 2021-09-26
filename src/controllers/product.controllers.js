const { Category, Product } = require("../models");

module.exports = {
  createCategory: async (req, res, next) => {
    try {
      const { name, code } = req.body;

      const newCate = new Category({ name, code });
      const savedCate = await newCate.save();
      res.json({
        success: true,
        message: `Category ${name}:${savedCate._id} created`,
      });
    } catch (error) {
      next(error);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const { name, price, slug, description, category, images } = req.body;

      const newProduct = new Product({
        name,
        price,
        slug,
        description,
        category,
        images,
      });

      const savedProduct = await newProduct.save();

      res.json({
        success: true,
        message: `Product ${name} created successfully`,
        result: savedProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.find().populate("category");
      res.json({ success: true, result: products });
    } catch (error) {
      next(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
