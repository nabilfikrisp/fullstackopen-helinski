const Blog = require("../models/blog");

const getAll = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};

const show = async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  return response.json(blog);
};

const save = async (request, response) => {
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
};

const deleteById = async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);
  if (!result) {
    return response.status(400).end();
  }
  return response.status(204).json(result);
};

const update = async (request, response) => {
  const { title, likes, url, author } = request.body;

  const updateBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, likes, url, author },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  if (!updateBlog) {
    return response.status(400).end();
  }

  return response.json(updateBlog);
};

module.exports = { getAll, save, show, deleteById, update };
