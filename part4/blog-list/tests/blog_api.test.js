const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./test_helper");

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("API GET", () => {
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

  test("get by id should return a blog", async () => {
    const id = "5a422a851b54a676234d17f7";

    const response = await api.get(`/api/blogs/${id}`);
    expect(response.body.id).toBe(id);
  });

  test("get non existent id", async () => {
    await api.get(`/api/blogs/${helper.nonExistingId}`).expect(400);
  });
});

describe("API POST", () => {
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
});

describe("API DELETE", () => {
  test("delete blog from db", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    const blog = blogs[0];

    await api.delete(`/api/blogs/${blog.id}`).expect(204);

    const afterDeleteResponse = await api.get("/api/blogs");
    const afterDeleteBlogs = afterDeleteResponse.body;

    expect(afterDeleteBlogs).toHaveLength(blogs.length - 1);
  });

  test("delete non existent id", async () => {
    await api.delete(`/api/blogs/64fb605a7d9a634499f2e112`).expect(400);
  });
});

describe("API PUT", () => {
  test("update certain blog from db", async () => {
    const updateContent = {
      title: "updated",
      author: "updated author",
      likes: 11,
      url: "updated url",
    };

    const response = await api.get("/api/blogs");
    const blogs = response.body;
    const blog = blogs[0];

    await api.put(`/api/blogs/${blog.id}`).send(updateContent).expect(200);

    const updatedResponse = await api.get(`/api/blogs/${blog.id}`);
    const updatedBlog = updatedResponse.body;

    expect(updatedBlog).toEqual({ ...updateContent, id: blog.id });
  });

  test("update non existent blog from db", async () => {
    await api.put(`/api/blogs/64fb605a7d9a634499f2e111`).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
