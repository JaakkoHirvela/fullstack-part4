const logger = require("./logger");
const { getTokenFrom } = require("./auth_helpers");

const errorHandler = (error, request, response, next) => {
  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "username must be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  
  next();
};

module.exports = { errorHandler, tokenExtractor };
