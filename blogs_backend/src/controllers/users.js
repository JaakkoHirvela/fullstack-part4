const logger = require("../utils/logger");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();


usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1, id: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (!password) {
      return response.status(400).json({ error: "password is required" });
    } else if (!username) {
      return response.status(400).json({ error: "username is required" });
    } else if (password.length < 3) {
      return response.status(400).json({ error: "password must be at least 3 characters long" });
    }

    const user = new User({
      userName: username,
      name,
      passwordHash: await bcrypt.hash(password, 10), // Hash the password.
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
