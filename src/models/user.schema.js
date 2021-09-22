const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
