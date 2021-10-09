const { Conflict, BadRequest, InternalServerError } = require("http-errors");
const { User } = require("../models");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const cloudinary = require("../utils/cloudinary");
const omit = require("lodash/omit");
const Joi = require("joi");
const expo = require("../utils/expo");

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
const updateSchema = Joi.object({
  username: Joi.string(),
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

      const payload = {
        _id: user._id,
        email,
        role: user.role,
        pushToken: user.pushToken,
      };

      const accessToken = await generateAccessToken(payload);
      const refreshToken = await generateRefreshToken(payload);

      res.json({
        success: true,
        message: "Login successfully",
        result: {
          accessToken,
          refreshToken,
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

      const payload = {
        _id: savedUser._id,
        email,
        role: savedUser.role,
        pushToken: savedUser.pushToken,
      };

      const accessToken = await generateAccessToken(payload);
      const refreshToken = await generateRefreshToken(payload);

      res.json({
        success: true,
        message: "Register successfully",
        result: {
          accessToken,
          refreshToken,
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
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          avatar: `https://ui-avatars.com/api/?name=${username}`,
          username,
          age,
        },
        { new: true }
      );

      res.json({
        success: true,
        message: "Update your information successfully",
        result: omit(user.toObject(), ["password"]),
      });
    } catch (error) {
      next(error);
    }
  },
  updateAvatar: async (req, res, next) => {
    try {
      const uploaded = await cloudinary.uploadSingle(req.file.path);
      if (!uploaded) {
        throw BadRequest();
      }
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          avatar: uploaded.url,
        },
        { new: true }
      );

      res.json({
        success: true,
        message: "Update your avatar successfully",
        result: omit(user.toObject(), ["password"]),
      });
    } catch (error) {
      next(error);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const { _id, email, role } = await verifyRefreshToken(refreshToken);

      const accToken = await generateAccessToken({ _id, email, role });
      const refToken = await generateRefreshToken({ _id, email, role });

      res.json({
        success: true,
        result: {
          accessToken: accToken,
          refreshToken: refToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  savePushToken: async (req, res, next) => {
    try {
      const { token } = req.body;
      const validToken = await expo.isValidPushToken(token);
      await User.findByIdAndUpdate(req.user._id, {
        pushToken: validToken,
      });

      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },
};
