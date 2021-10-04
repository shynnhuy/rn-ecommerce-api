const { Schema } = require("mongoose");

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
    price: {
      discount: { type: Number, default: 0 },
      old: { type: Number, required: true },
      reduced: { type: Number },
      new: { type: Number },
    },
    description: {
      type: String,
    },
    images: [String],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

ProductSchema.pre(["save"], function (next) {
  try {
    const reducedPrice = (this.price.old * this.price.discount) / 100;
    const newPrice = this.price.old - reducedPrice;
    this.price.reduced = reducedPrice;
    this.price.new = newPrice;
    next();
  } catch (error) {
    next(error);
  }
});

ProductSchema.pre(["findByIdAndUpdate", "findOneAndUpdate"], function (next) {
  try {
    const reducedPrice =
      (this._update.price.old * this._update.price.discount) / 100;
    const newPrice = this._update.price.old - reducedPrice;
    this._update.price.reduced = reducedPrice;
    this._update.price.new = newPrice;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = ProductSchema;
