const { Schema } = require("mongoose");

const NotificationSchema = new Schema(
  {
    receiver: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = NotificationSchema;
