const { Admin } = require("../helpers/role");
const { User } = require("../models");

module.exports = {
  getAdminsToken: async () => {
    try {
      const admins = await User.find({ role: Admin });
      const tokens = admins.map((admin) => admin.pushToken);
    //   console.log(tokens);
      return tokens;
    } catch (error) {
      throw error;
    }
  },
};
