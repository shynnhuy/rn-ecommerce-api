const { Forbidden, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw Unauthorized("No Token Provided.");
    const token = authorization.split(" ")[1];
    if (!token) throw Unauthorized("No Token Provided.");
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw Unauthorized();
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};
