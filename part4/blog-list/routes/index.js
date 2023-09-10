const express = require("express");
const router = express.Router();
const blogRouter = require("./blogRoutes");
const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");

router.get("/", (request, response) => {
  response.send("<h1>go to /api/blogs</h1>");
});

router.use("/api/blogs", blogRouter);
router.use("/api/users", userRouter);
router.use("/api/auth", authRouter);

module.exports = router;
