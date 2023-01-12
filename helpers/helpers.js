
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let message = "Internal server error";
  let statusCode = 500;

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      message = err.errors[0].message;
      statusCode = 400;
      break;
    case "UNAUTHORIZED":
      message = "Invalid token";
      statusCode = 401;
      break;
    case "MidtransError":
      message = err.ApiResponse.error_messages[0]
      statusCode = 400;
      break;
  }

  res.status(statusCode).json({ message });
};

module.exports = { errorHandler };
