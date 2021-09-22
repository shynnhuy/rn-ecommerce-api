const { model } = require("mongoose");
const UserSchema = require("./user.schema");

const User = model("Users", UserSchema);

module.exports = {
  User,
};
