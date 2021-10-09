const { Schema } = require("mongoose");

const OrderItem = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  price: {
    type: Number,
  },
  amount: {
    type: Number,
    default: 1,
  },
});

const OrderSchema = new Schema(
  {
    name: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: {
      type: [OrderItem],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "shipping", "cancel", "finish"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = OrderSchema;
