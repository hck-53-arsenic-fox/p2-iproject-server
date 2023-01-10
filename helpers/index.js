const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//BCRYPT
const hashPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

//JWT
const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

//NODEMAILER
function sendNodemailer(email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    service: "gmail",
    secure: true,
    auth: {
      user: "tweetwar2022@gmail.com",
      pass: process.env.NODEMAILER_KEY,
    },
    debug: true,
    logger: true,
  });

  const option = {
    from: "tweetwar2022@gmail.com",
    to: email,
    subject: "Acount Success Update Status",
    text: "Your Account Success Update Status to VIP",
    html: "<b>Your Account Success Update Status to VIP</b>",
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve("success");
      console.log("sent: " + info);
    });
  });
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  sendNodemailer,
};
