import app from "#app.js";
import { Blog, IBlog } from "#models/blog.js";
import { connectToDatabase } from "#utils/db.js";
import assert from "assert";
import mongoose from "mongoose";
import test, { after, before, describe } from "node:test";
import supertest from "supertest";
import { Response } from "supertest";

interface IBlogWithId extends IBlog {
  id: string;
}

const api = supertest(app);

const initialBlogs = [
  {
    author: "Alice",
    likes: 5,
    title: "First Blog",
    url: "http://example.com/1",
  },
  {
    author: "Bob",
    likes: 3,
    title: "Second Blog",
    url: "http://example.com/2",
  },
];

before(async () => {
  await connectToDatabase();
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

after(async () => {
  await Blog.deleteMany({});
  await mongoose.connection.close();
});

await describe("Blog API", async () => {
  await test("Blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  await test("All blogs are returned", async () => {
    const response: Response = await api.get("/api/blogs").expect(200);
    const blogs = response.body as IBlog[];
    assert.strictEqual(blogs.length, initialBlogs.length);
  });

  await test("A specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs").expect(200);
    const blogs = response.body as IBlog[];

    const titles = blogs.map((blog) => blog.title);
    assert(titles.includes("First Blog"));
  });

  await test("Blog without title is not added", async () => {
    const newBlog = {
      author: "David",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    const blogs = response.body as IBlog[];

    assert.strictEqual(blogs.length, initialBlogs.length);
  });

  await test("A valid blog can be added ", async () => {
    const newBlog = {
      author: "Charlie",
      likes: 2,
      title: "Third Blog",
      url: "http://example.com/3",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs").expect(200);
    const blogs = response.body as IBlog[];

    const titles = blogs.map((blog) => blog.title);

    assert.strictEqual(blogs.length, initialBlogs.length + 1);

    assert(titles.includes("Third Blog"));
  });

  await test("A blog can be deleted", async () => {
    const response = await api.get("/api/blogs").expect(200);
    const blogsAtStart = response.body as IBlogWithId[];
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const responseAfterDelete = await api.get("/api/blogs").expect(200);
    const blogsAtEnd = responseAfterDelete.body as IBlogWithId[];
    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(!titles.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });

  await test("A valid blog can be added without likes field", async () => {
    const newBlog = {
      author: "Charlie",
      title: "Third Blog",
      url: "http://example.com/3",
    };

    const postResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdBlog = postResponse.body as IBlogWithId;
    assert.strictEqual(createdBlog.likes, 0);
  });
});
