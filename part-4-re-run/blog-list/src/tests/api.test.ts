import app from "#app.js";
import { Blog, IBlog } from "#models/blog.js";
import { User } from "#models/user.js";
import { connectToDatabase } from "#utils/db.js";
import assert from "assert";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import test, { after, before, beforeEach, describe } from "node:test";
import supertest from "supertest";
import { initialUser, login, usersInDb } from "./test_helper.js";

interface IBlogWithId extends IBlog {
  id: string;
}

const api = supertest(app);

const initialBlogs = [
  {
    likes: 5,
    title: "First Blog",
    url: "http://example.com/1",
  },
  {
    likes: 3,
    title: "Second Blog",
    url: "http://example.com/2",
  },
];

before(async () => {
  await connectToDatabase();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  const passwordHash = await bcrypt.hash(initialUser.password, 10);
  const createdUser = await User.insertOne({ ...initialUser, passwordHash });
  await Blog.insertMany([
    { ...initialBlogs[0], author: createdUser._id },
    { ...initialBlogs[1], author: createdUser._id },
  ]);
});

after(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

function assertBlogsArray(body: unknown): asserts body is IBlogWithId[] {
  if (!Array.isArray(body)) throw new Error("Response body is not an array");
  // Optionally check shape of each item
  for (const blog of body) {
    if (
      typeof blog !== "object" ||
      blog === null ||
      typeof (blog as IBlogWithId).title !== "string" ||
      typeof (blog as IBlogWithId).author !== "string" ||
      typeof (blog as IBlogWithId).url !== "string" ||
      typeof (blog as IBlogWithId).id !== "string"
    ) {
      throw new Error("Blog item shape is invalid");
    }
  }
}

await describe("API", async () => {
  await test("GET /api/blogs returns blogs as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  await test("GET /api/blogs returns all blogs", async () => {
    const response = await api.get("/api/blogs").expect(200);
    assertBlogsArray(response.body);
    const blogs = response.body;
    assert.strictEqual(blogs.length, initialBlogs.length);
  });

  await test("GET /api/blogs includes a specific blog by title", async () => {
    const response = await api.get("/api/blogs").expect(200);
    assertBlogsArray(response.body);
    const blogs = response.body;
    const titles = blogs.map((blog) => blog.title);
    assert(titles.includes("First Blog"));
  });

  await test("POST /api/blogs does not add blog without title", async () => {
    const token = await login(api, initialUser.username, initialUser.password);
    const newBlog = { author: "David" };
    await api.post("/api/blogs").set("Authorization", `Bearer ${token}`).send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    assertBlogsArray(response.body);
    const blogs = response.body;
    assert.strictEqual(blogs.length, initialBlogs.length);
  });

  await test("POST /api/blogs adds a valid blog", async () => {
    const token = await login(api, initialUser.username, initialUser.password);
    const newBlog = {
      author: "Charlie",
      likes: 2,
      title: "Third Blog",
      url: "http://example.com/3",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs").expect(200);
    assertBlogsArray(response.body);
    const blogs = response.body;
    const titles = blogs.map((blog) => blog.title);

    assert.strictEqual(blogs.length, initialBlogs.length + 1);
    assert(titles.includes("Third Blog"));
  });

  await test("DELETE /api/blogs/:id deletes a blog", async () => {
    const token = await login(api, initialUser.username, initialUser.password);
    const responseStart = await api.get("/api/blogs").expect(200);
    assertBlogsArray(responseStart.body);
    const blogsAtStart = responseStart.body;
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const responseEnd = await api.get("/api/blogs").expect(200);
    assertBlogsArray(responseEnd.body);
    const blogsAtEnd = responseEnd.body;
    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(!titles.includes(blogToDelete.title));
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });

  await test("POST /api/blogs sets likes to 0 if missing", async () => {
    const token = await login(api, initialUser.username, initialUser.password);
    const newBlog = {
      author: "Charlie",
      title: "Third Blog",
      url: "http://example.com/3",
    };

    const postResponse = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdBlog = postResponse.body as IBlogWithId;
    assert.strictEqual(createdBlog.likes, 0);
  });

  await test("POST /api/blogs fails with 401 if JWT token is missing", async () => {
    const newBlog = {
      author: "Charlie",
      likes: 2,
      title: "Third Blog",
      url: "http://example.com/3",
    };

    const response = await api.post("/api/blogs").send(newBlog).expect(401);

    const errorBody = response.body as { error: string };
    assert(errorBody.error.includes("Missing authorization header"));
  });

  await test("POST /api/users succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u: { username: string }) => u.username);
    assert(usernames.includes(newUser.username));
  });

  await test("POST /api/users fails with 400 and error if username already exists", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: initialUser.username,
      name: initialUser.name,
      password: initialUser.password,
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    const errorBody = result.body as { error: string };

    assert(errorBody.error.includes("User already exists"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
