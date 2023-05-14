const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "akshay", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
