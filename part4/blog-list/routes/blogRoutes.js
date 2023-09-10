const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blogController");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", blogController.getAll);
blogRouter.get("/:id", blogController.show);
blogRouter.post("/", userExtractor, blogController.save);
blogRouter.delete("/:id", userExtractor, blogController.deleteById);
blogRouter.put("/:id", blogController.update);

module.exports = blogRouter;
