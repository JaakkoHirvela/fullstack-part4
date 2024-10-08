const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger");

loginRouter.post("/", async (request, response) => {
  const { userName, password } = request.body;
  const user = await User.findOne({ userName: userName });

  if (!user) {
    return response.status(401).json({ error: "invalid username" });
  }
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(401).json({ error: "invalid password" });
  }
  const userForToken = {
    username: user.userName,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 }); // 1 hour token

  response.status(200).send({ token, userName: user.userName, name: user.name });
});

module.exports = loginRouter;
