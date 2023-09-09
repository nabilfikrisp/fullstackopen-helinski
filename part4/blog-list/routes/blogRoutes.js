const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blogController");

blogRouter.get("/", blogController.getAll);
blogRouter.get("/:id", blogController.show);
blogRouter.post("/", blogController.save);
blogRouter.delete("/:id", blogController.deleteById);
blogRouter.put("/:id", blogController.update);

module.exports = blogRouter;
