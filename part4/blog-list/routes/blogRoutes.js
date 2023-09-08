const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blogController");

blogRouter.get("/", blogController.getAll);
blogRouter.post("/", blogController.save);

module.exports = blogRouter;
