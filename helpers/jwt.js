const { sign, verify } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = {
  createToken: (payload) => {
    return sign(payload, secret);
  },
  decodeToken: (token) => {
    return verify(token, secret);
  },
};
