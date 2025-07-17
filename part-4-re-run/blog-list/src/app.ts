import { blogRouter } from "#controllers/blog.js";
import config from "#utils/config.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { setupMorganToken } from "./utils/logger.js";
import { errorHandler, unknownEndpoint } from "./utils/middlewares.js";

setupMorganToken(morgan);

const app = express();

app.use(express.json());
app.use(cors());

if (config.ENABLE_LOGGING) {
  app.use(morgan(":method :url :status :response-time ms :body"));
}

app.use("/api/blogs", blogRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
