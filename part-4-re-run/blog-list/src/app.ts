import { blogsRouter } from "#controllers/blog.js";
import config from "#utils/config.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { setupMorganToken } from "./utils/logger.js";
import { errorHandler, unknownEndpoint } from "./utils/middlewares.js";
import { usersRouter } from "#controllers/user.js";
import loginRouter from "#controllers/login.js";

setupMorganToken(morgan);

const app = express();

app.use(express.json());
app.use(cors());

if (config.ENABLE_LOGGING) {
  app.use(morgan(":method :url :status :response-time ms :body"));
}

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
