const Blog = require("../models/blog");

const getAll = async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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
  const { title, author, url, likes } = request.body;

  const user = request.user;

  if (!title || !url) {
    return response
      .status(400)
      .json("request should contain title or url body");
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog];
  await user.save();

  return response.status(201).json(savedBlog);
};

const deleteById = async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return response.status(400).json({ error: "invalid blog id" });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).josn({ error: "unauthorized delete action" });
  }

  user.blogs = user.blogs.filter(
    (item) => item.toString() !== blog.id.toString()
  );
  await user.save();

  await Blog.deleteOne(blog);

  return response.status(204).json("test delete");
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
  ).populate("user", { username: 1, name: 1 });

  if (!updateBlog) {
    return response.status(400).end();
  }

  return response.json(updateBlog);
};

module.exports = { getAll, save, show, deleteById, update };
