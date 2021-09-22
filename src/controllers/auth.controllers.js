const { Conflict, BadRequest } = require("http-errors");
const { User } = require("../models");
const { generateAccessToken } = require("../utils/jwt");
const omit = require("lodash/omit");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw BadRequest("Email is not exists");
      }

      if (!user.isValidPassword(password)) {
        throw BadRequest("Email or password is not match");
      }

      const accessToken = await generateAccessToken({ _id: user._id, email });

      res.json({
        success: true,
        message: "Login successfully",
        result: {
          token: accessToken,
          user: omit(user.toObject(), ["password"]),
        },
      });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        throw Conflict("Email is taken");
      }

      const newUser = new User({ email, password });
      const savedUser = await newUser.save();

      const accessToken = await generateAccessToken({
        _id: savedUser._id,
        email,
      });

      res.json({
        success: true,
        message: "Register successfully",
        result: {
          token: accessToken,
          user: omit(savedUser.toObject(), "password"),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
