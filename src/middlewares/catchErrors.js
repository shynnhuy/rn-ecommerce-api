const { NotFound } = require("http-errors");

module.exports = {
  apiNotFound: (_req, _res, next) => next(NotFound("API not found")),
  apiError: (error, _req, res, _next) =>
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    }),
};
