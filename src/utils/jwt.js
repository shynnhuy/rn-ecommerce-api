const { InternalServerError } = require("http-errors");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

module.exports = {
  generateAccessToken: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
        },
        (err, token) => {
          if (err) {
            reject(InternalServerError(err));
          }
          resolve(token);
        }
      );
    });
  },
  generateRefreshToken: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30m",
        },
        (err, token) => {
          if (err) {
            reject(InternalServerError(err));
          }
          resolve(token);
        }
      );
    });
  },
};
