const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);
const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info(`connected to mongoose`);
  })
  .catch((error) => logger.error(error));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/", routes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
