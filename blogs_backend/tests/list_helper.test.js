const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../src/utils/list_helper");
const logger = require("../src/utils/logger");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("utils", () => {
  const blogsWiththirtySixLikes = [
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
      likes: 5,
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
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  const differentOrderBlogs = [
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
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
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
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

  const oneBlogWithSevenLikes = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
  ];

  const blogsWithSameLikes = [
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
      likes: 12,
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

  describe("total likes", () => {
    test("of empty list is zero", () => {
      const result = listHelper.totalLikes([]);
      assert.strictEqual(result, 0);
    });

    test("of list consisting of one blog is calculated right", () => {
      const result = listHelper.totalLikes(oneBlogWithSevenLikes);
      assert.strictEqual(result, 7);
    });

    test("of a bigger list is calculated right", () => {
      const result = listHelper.totalLikes(blogsWiththirtySixLikes);
      assert.strictEqual(result, 36);
    });
  });

  describe("favorite blog", () => {
    test("of empty list is null", () => {
      const result = listHelper.favoriteBlog([]);
      assert.strictEqual(result, null);
    });
    test("of list consisting of one blog returns the blog", () => {
      const result = listHelper.favoriteBlog(oneBlogWithSevenLikes);
      assert.deepStrictEqual(result, oneBlogWithSevenLikes[0]);
    });
    test("of bigger list returns the correct blog", () => {
      const result = listHelper.favoriteBlog(blogsWiththirtySixLikes);
      assert.deepStrictEqual(result, blogsWiththirtySixLikes[2]);
    });
    test("of list with blogs having same likes returns the first with max likes", () => {
      const result = listHelper.favoriteBlog(blogsWithSameLikes);
      assert.deepStrictEqual(result, blogsWithSameLikes[1]);
    });
  });

  describe("most blogs", () => {
    test("of empty list is null", () => {
      const result = listHelper.mostBlogs([]);
      assert.strictEqual(result, null);
    });
    test("of list consisting of one blog returns its author", () => {
      const result = listHelper.mostBlogs(oneBlogWithSevenLikes);
      assert.deepStrictEqual(result, { author: "Michael Chan", blogs: 1 });
    });
    test("of bigger list returns the author with most blogs", () => {
      const result = listHelper.mostBlogs(blogsWiththirtySixLikes);
      assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
    });
    test("of bigger list in different order returns the author with most blogs", () => {
      const result = listHelper.mostBlogs(differentOrderBlogs);
      assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
    });
  });

  describe("most likes", () => {
    test("of empty list is null", () => {
      const result = listHelper.mostLikes([]);
      assert.strictEqual(result, null);
    });
    test("of list consisting of one blog returns its author", () => {
      const result = listHelper.mostLikes(oneBlogWithSevenLikes);
      assert.deepStrictEqual(result, { author: "Michael Chan", likes: 7 });
    });
    test("of bigger list returns the author with most likes", () => {
      const result = listHelper.mostLikes(blogsWiththirtySixLikes);
      assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
    });
    test("of bigger list in different order returns the author with most likes", () => {
      const result = listHelper.mostLikes(differentOrderBlogs);
      assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
    });
  });
});
