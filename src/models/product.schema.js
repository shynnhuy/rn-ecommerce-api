const { Schema } = require("mongoose");

const PriceSchema = new Schema({
  old: {
    type: Number,
    required: true,
  },
  new: {
    type: Number,
  },
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: PriceSchema,
    description: {
      type: String,
    },
    images: [String],
  },
  { timestamps: true, versionKey: false }
);

module.exports = ProductSchema;
