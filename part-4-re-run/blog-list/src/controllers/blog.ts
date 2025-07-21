import { Blog, IBlog, IBlogForCreation } from "#models/blog.js";
import { User } from "#models/user.js";
import { AuthenticatedRequest, authenticateToken } from "#utils/auth-guard.js";
import { NextFunction, Request, Response, Router } from "express";

export const blogsRouter = Router();

// Public routes
blogsRouter.get("/", async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const blogs = await Blog.find({}).populate("author", {
      username: 1,
      name: 1,
    });
    if (blogs.length === 0) {
      return response.status(404).json({ error: "Blogs not found" });
    }
    return response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
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

// Protected routes
blogsRouter.use(authenticateToken);
blogsRouter.post("/", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const body = request.body as IBlogForCreation;
    const authenticatedUser = (request as AuthenticatedRequest).user;

    if (!authenticatedUser) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const author = await User.findById(authenticatedUser.id);
    if (!author) {
      return response.status(400).json({ error: "Author not found" });
    }

    const blog = new Blog({
      title: body.title,
      url: body.url ?? "",
      author: author._id,
      ...(body.likes ? { likes: body.likes } : {}),
    });

    const savedBlog = await blog.save();

    author.blogs = author.blogs.concat(savedBlog._id);
    await author.save();

    return response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id;
  const body = request.body as IBlog;

  try {
    const blog = await Blog.findByIdAndUpdate(id, body, {
      context: "query",
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }
    return response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id;
  const authenticatedUser = (request as AuthenticatedRequest).user;

  if (!authenticatedUser) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.author.toString() !== authenticatedUser.id.toString()) {
      return response.status(403).json({ error: "Forbidden" });
    }

    await Blog.findByIdAndDelete(id);
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});
