const logger = require("./logger");
const { getTokenFrom } = require("./auth_helpers");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "username must be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;

  next();
};

const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return next(error);
  }
  request.user = await User.findById(decodedToken.id);

  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
