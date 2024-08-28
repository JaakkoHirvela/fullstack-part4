const Blog = require("../models/blog");
const User = require("../models/user");
const blogsRouter = require("express").Router();
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
const { userExtractor } = require("../utils/middleware");

/**
 * Unauthorized users have only read access to the blogs.
 * Logged in users can create, update and delete blogs.
 */

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { userName: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  const user = request.user;
  const blog = new Blog({ user: user._id, ...request.body });

  if (!blog.title) return response.status(400).json({ error: "title is required" });
  if (!blog.url) return response.status(400).json({ error: "url is required" });

  const result = await blog.save();

  // Add the blog to the user's blogs here also.
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  // Check if the id is valid.
  if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ error: "invalid id" });

  const blog = await Blog.findById(request.params.id);
  if (!blog) return response.status(404).json({ error: "blog not found" });

  // Check that the user is the creator of the blog.
  if (blog.user.toString() !== request.user._id.toString()) return response.status(401).json({ error: "unauthorized" });

  await Blog.deleteOne({ _id: request.params.id });
  return response.status(204).end();
});

/**
 * Update a blog.
 *
 * Currently every field in the blog can be updated.
 */
blogsRouter.put("/:id", userExtractor, async (request, response) => {
  // Check if the id is valid.
  if (!ObjectId.isValid(request.params.id)) return response.status(400).json({ error: "invalid id" });

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });

  // Check that the blog exists.
  if (!updatedBlog) return response.status(404).json({ error: "blog not found" });

  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
