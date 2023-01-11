function errorHandler(err, req, res, next) {
  let message = "Internal server error";
  let statusCode = 500;
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      message = err.errors.map((el) => el.message);
      statusCode = 400;
      break;
    case "Unauthorized":
      message = "Invalid Token";
      statusCode = 401;
      break;
    case "Unauthorized":
      message = "Forbidden";
      statusCode = 403;
      break;
    case "Not Found":
      message = "Data Not Found";
      statusCode = 404;
      break;
    case "Credential":
      message = "Invalid Email or Password";
      statusCode = 401;
      break;
  }
  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
