const { Unauthorized } = require("http-errors");

module.exports = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      next(Unauthorized("You don't have premission to access this resource!"));
    }
    next();
  };
};
