import { authorWithMostBlogs, authorWithMostLikes, dummy, favoriteBlog, totalLikes } from "#utils/list_helper.js";
import assert from "node:assert";
import test, { describe } from "node:test";

await describe("List Helper", async () => {
  await test("Dummy returns one", () => {
    const blogs: unknown[] = [];

    const result = dummy(blogs);
    assert.strictEqual(result, 1);
  });

  await describe("Total Likes", async () => {
    const listWithOneBlog = [
      {
        __v: 0,
        _id: "5a422aa71b54a676234d17f8",
        author: "Edsger W. Dijkstra",
        likes: 5,
        title: "Go To Statement Considered Harmful",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      },
    ];

    await test("When list has only one blog, equals the likes of that blog", () => {
      const result = totalLikes(listWithOneBlog);
      assert.strictEqual(result, 5);
    });
  });

  await describe("Blogs", async () => {
    const blogs = [
      {
        __v: 0,
        _id: "5a422a851b54a676234d17f7",
        author: "Michael Chan",
        likes: 7,
        title: "React patterns",
        url: "https://reactpatterns.com/",
      },
      {
        __v: 0,
        _id: "5a422aa71b54a676234d17f8",
        author: "Edsger W. Dijkstra",
        likes: 5,
        title: "Go To Statement Considered Harmful",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      },
      {
        __v: 0,
        _id: "5a422b3a1b54a676234d17f9",
        author: "Edsger W. Dijkstra",
        likes: 12,
        title: "Canonical string reduction",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      },
      {
        __v: 0,
        _id: "5a422b891b54a676234d17fa",
        author: "Robert C. Martin",
        likes: 10,
        title: "First class tests",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      },
      {
        __v: 0,
        _id: "5a422ba71b54a676234d17fb",
        author: "Robert C. Martin",
        likes: 0,
        title: "TDD harms architecture",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      },
      {
        __v: 0,
        _id: "5a422bc61b54a676234d17fc",
        author: "Robert C. Martin",
        likes: 2,
        title: "Type wars",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      },
    ];

    await test("Returns the blog with the most likes", () => {
      const result = favoriteBlog(blogs);
      assert.deepStrictEqual(result, {
        __v: 0,
        _id: "5a422b3a1b54a676234d17f9",
        author: "Edsger W. Dijkstra",
        likes: 12,
        title: "Canonical string reduction",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      });
    });

    await test("Author with most blogs", () => {
      const result = authorWithMostBlogs(blogs);
      assert.deepStrictEqual(result, {
        author: "Robert C. Martin",
        blogs: 3,
      });
    });

    await test("Author with most likes", () => {
      const result = authorWithMostLikes(blogs);
      assert.deepStrictEqual(result, {
        author: "Edsger W. Dijkstra",
        likes: 17,
      });
    });
  });
});
