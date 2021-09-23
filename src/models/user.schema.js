const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: { type: String, default: "" },
    password: {
      type: String,
      required: true,
    },
    age: { type: Number },
    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?name=Shynn+Huy",
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", function (next) {
  const salt = genSaltSync(5);
  const hashed = hashSync(this.password, salt);
  this.password = hashed;
  next();
});

UserSchema.methods = {
  isValidPassword: function (password) {
    return compareSync(password, this.password);
  },
};

module.exports = UserSchema;
