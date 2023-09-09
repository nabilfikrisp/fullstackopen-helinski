const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./test_helper");

beforeAll(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blog id are id not _id", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];

  expect(blog.id).toBeDefined();
});

test("blog are correctly saved", async () => {
  const newBlog = {
    title: "this is new blog",
    author: "new author",
    url: "www.newblog.com",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
});

test("missing likes request body should return blog with 0 likes", async () => {
  const newBlog = {
    title: "this is 0 likes",
    author: "this is 0 author likes",
    url: "www.zerolikes.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const savedBlog = response.body;
  expect(savedBlog.likes).toBe(0);
});

test("missing title or url request body should return 404", async () => {
  const newBlog = {
    url: "www.missingbody.com",
    likes: 11,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
