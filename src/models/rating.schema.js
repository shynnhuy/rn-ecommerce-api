const { Schema } = require("mongoose");

const RatingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    value: {
      type: Number,
    },
  },
  { versionKey: false }
);

module.exports = RatingSchema;
