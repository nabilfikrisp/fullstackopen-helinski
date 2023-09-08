const express = require("express");
const router = express.Router();
const blogRouter = require("./blogRoutes");

router.get("/", (request, response) => {
  response.send("<h1>go to /api/blogs</h1>");
});

router.use("/api/blogs", blogRouter);

module.exports = router;
