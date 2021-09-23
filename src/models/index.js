const { model } = require("mongoose");
const CategorySchema = require("./category.schema");
const ProductSchema = require("./product.schema");
const UserSchema = require("./user.schema");

const User = model("Users", UserSchema);
const Category = model("Categories", CategorySchema);
const Product = model("Products", ProductSchema);

module.exports = {
  User,
  Category,
  Product,
};
