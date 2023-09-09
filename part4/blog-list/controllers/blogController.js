const Blog = require("../models/blog");

const getAll = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};

const save = async (request, response) => {
  try {
    const blog = new Blog(request.body);

    if (!blog.likes) {
      blog.likes = 0;
    }

    if (!blog.title || !blog.url) {
      return response
        .status(400)
        .json("request should contain title or url body");
    }

    const result = await blog.save();

    return response.status(201).json(result);
  } catch (error) {
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAll, save };
