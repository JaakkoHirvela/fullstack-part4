const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "username must be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  next(error);
};

module.exports = { errorHandler };
