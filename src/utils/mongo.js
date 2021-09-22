const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", function callback() {
  console.log("Connected to mongo server.");
});

module.exports = db;
