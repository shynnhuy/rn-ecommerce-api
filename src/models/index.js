const { model } = require("mongoose");
const CategorySchema = require("./category.schema");
const ProductSchema = require("./product.schema");
const UserSchema = require("./user.schema");
const OrderSchema = require("./order.schema");
const RatingSchema = require("./rating.schema");
const NotificationSchema = require("./notification.schema");

const User = model("Users", UserSchema);
const Category = model("Categories", CategorySchema);
const Product = model("Products", ProductSchema);
const Order = model("Order", OrderSchema);
const Notification = model("Notification", NotificationSchema);
const Rating = model("Rating", RatingSchema);

module.exports = {
  User,
  Category,
  Product,
  Order,
  Notification,
  Rating,
};
