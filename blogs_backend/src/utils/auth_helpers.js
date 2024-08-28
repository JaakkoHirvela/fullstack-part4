const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

module.exports = {
  getTokenFrom,
};
