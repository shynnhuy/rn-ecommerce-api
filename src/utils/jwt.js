const { InternalServerError, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const client = require("./redis");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

module.exports = {
  generateAccessToken: (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) {
            reject(InternalServerError(err.message));
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
          expiresIn: "7d",
        },
        (err, token) => {
          if (err) {
            console.log(err.message);
            reject(InternalServerError(err.message));
          }
          const userId = payload._id.toString();
          console.log(userId);
          client.SET(userId, token, "EX", 7 * 24 * 60 * 60, (err, rep) => {
            if (err) {
              console.log(err);
              return reject(InternalServerError(err.message));
            }
            resolve(token);
          });
        }
      );
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          reject(Unauthorized());
        }
        const userId = payload._id.toString();
        client.GET(userId, (err, result) => {
          if (err) {
            console.log(err.message);
            reject(InternalServerError());
          }
          if (refreshToken === result) return resolve(payload);
          reject(Unauthorized());
        });
      });
    });
  },
};
