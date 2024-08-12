const Blog = require("../models/blog");
const blogsRouter = require("express").Router();
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title) return response.status(400).json({ error: "title is required" });

  if (!blog.url) return response.status(400).json({ error: "url is required" });

  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
