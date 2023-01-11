const bcrypt = require("bcrypt");

const hash = (myPlaintextPassword) => bcrypt.hashSync(myPlaintextPassword, 8);
const compare = (inputPassword, hashedPassword) =>
  bcrypt.compareSync(inputPassword, hashedPassword);

module.exports = { hash, compare };
