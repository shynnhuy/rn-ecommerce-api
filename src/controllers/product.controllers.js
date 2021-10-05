const { Category, Product } = require("../models");
const cloudinary = require("../utils/cloudinary");

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
      const images = await cloudinary.uploadMultiple(req.files);
      // console.log(uploaded);
      const { name, price, discount, slug, description, category } = req.body;

      const newProduct = new Product({
        name,
        price: {
          old: price,
          discount,
        },
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
      const { id } = req.params;
      const product = await Product.findById(id);
      res.json({ success: true, result: product });
    } catch (error) {
      next(error);
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.find();
      // console.log(categories);
      res.json({ success: true, result: categories });
    } catch (error) {
      next(error);
    }
  },
};
