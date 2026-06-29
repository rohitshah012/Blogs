const JWT = require("jsonwebtoken");
const env = require("../config/env");

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, env.jwtSecret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, env.jwtSecret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
