const basicAuth = require("express-basic-auth");
let middleware = null;

const getUsers = () => {
  const userStrings = process.env.API_USERS?.split(",") ?? [];
  const users = {};
  for (let string of userStrings) {
    const data = string.split(":");
    users[data[0]] = data[1];
  }
  return users;
};

const setMiddleware = () => {
  middleware = basicAuth({
    challenge: true,
    users: getUsers(),
  });
};

module.exports = () => {
  if (middleware == null)
    setMiddleware();
  return middleware;
};
