const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");
const Blog = require("../src/models/blog");
const logger = require("../src/utils/logger");

const api = supertest(app);

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  logger.info("db cleared");

  await Blog.insertMany(initialBlogs);
  logger.info("db seeded");
});

describe("api tests", () => {
  describe("GET /api/blogs", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("there's three blogs", async () => {
      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("the identification field is id instead of default _id", async () => {
      const response = await api.get("/api/blogs");
      assert(response.body[0]._id === undefined);
      assert(response.body[0].id);
    });
  });

  describe("POST /api/blogs", () => {
    test("a valid blog can be added", async () => {
      const newBlog = {
        title: "Test blog",
        author: "Test author",
        url: "https://test.com",
        likes: 0,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");
      const lastBlog = response.body[response.body.length - 1];

      // Check that the response body has one more blog than the initial blogs.
      assert.strictEqual(response.body.length, initialBlogs.length + 1);

      // Check that the last blog has the same title as the just added blog.
      assert.strictEqual(lastBlog.title, newBlog.title);
    });
  });
});

after(async () => {
  mongoose.connection.close();
});
