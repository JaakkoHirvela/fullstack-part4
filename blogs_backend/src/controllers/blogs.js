const Blog = require("../models/blog");
const blogsRouter = require("express").Router();
const logger = require("../utils/logger");
const { ObjectId } = require("mongoose").Types;

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

blogsRouter.delete("/:id", async (request, response) => {
  // Check if the id is valid.
  if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ error: "invalid id" });

  const result = await Blog.findOneAndDelete({ _id: request.params.id });

  if (!result) return response.status(404).json({ error: "blog not found" });

  response.status(204).end();
});

module.exports = blogsRouter;
