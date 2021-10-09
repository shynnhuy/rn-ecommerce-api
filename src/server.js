const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { apiNotFound, apiError } = require("./middlewares/catchErrors");

const server = express();
const { PORT } = process.env;

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

require("./utils/mongo");
require("./utils/redis");

server.use("/api/v1", require("./routes"));

server.use(apiNotFound);
server.use(apiError);

server.start = () =>
  server.listen(PORT, () => console.log(`Server listining on port ${PORT}`));
module.exports = server;
