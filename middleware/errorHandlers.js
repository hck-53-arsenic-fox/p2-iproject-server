const errorHandler = (error, req, res, next) => {
  console.log(error);
  let status = 0;
  let msg = "";
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      msg = error.errors.map((el) => el.message).toString();
      break;
    case "not found":
      status = 404;
      msg = "Error Not Found";
      break;
    case "ErrorValidation":
      status = 401;
      msg = "Email and Password required";
      break;
    case "ErrorCredentials":
      status = 401;
      msg = "Email and Password required";
      break;
    case "Unauthenticated":
      status = 401;
      msg = "Unauthenticated";
      break;
    case "Product Not Found":
      status = 404;
      msg = "Product Not Found";
      break;
    case "Forbidden":
      status = 403;
      msg = "Forbidden";
      break;
    case "JsonWebTokenError":
      status = 403;
      msg = "Forbidden";
      break;
    default:
      status = 500;
      msg = "Internal server error";
      break;
  }
  res.status(status).json({ msg });
};

module.exports = errorHandler;
