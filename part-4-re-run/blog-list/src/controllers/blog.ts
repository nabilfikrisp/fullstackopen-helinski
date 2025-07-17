import { Blog, IBlog } from "#models/blog.js";
import { NextFunction, Request, Response, Router } from "express";

export const blogRouter = Router();

blogRouter.post("/", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/", async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const blogs = await Blog.find({});
    if (blogs.length === 0) {
      return response.status(404).json({ error: "Blogs not found" });
    }
    return response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }
    return response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id;
  const body = request.body as IBlog;

  try {
    const blog = await Blog.findByIdAndUpdate(id, body, { context: "query", new: true, runValidators: true });

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }
    return response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});
