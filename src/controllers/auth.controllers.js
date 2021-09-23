const { Conflict, BadRequest } = require("http-errors");
const { User } = require("../models");
const { generateAccessToken } = require("../utils/jwt");
const omit = require("lodash/omit");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
const updateSchema = Joi.object({
  username: Joi.string().alphanum("Username only contain a-z, A-Z, and 0-9"),
  age: Joi.number().optional(),
});

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = await schema.validateAsync(req.body);

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
      const { email, password } = await schema.validateAsync(req.body);

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
  updateInfo: async (req, res, next) => {
    try {
      const { username, age } = await updateSchema.validateAsync(req.body);
      const user = await User.findById(req.user._id);

      const avatar = `https://ui-avatars.com/api/?name=${username}`;

      user.username = username;
      user.age = age;
      user.avatar = avatar;

      const userUpdated = await user.save();
      console.log(userUpdated);

      res.json({
        success: true,
        result: omit(userUpdated.toObject(), ["password"]),
      });
    } catch (error) {
      next(error);
    }
  },
};
