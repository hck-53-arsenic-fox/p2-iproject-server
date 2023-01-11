async function errorHandler(error,req,res,next){
  let status = 500
  let message = "internal server error"
  
  switch(error.name){
      case "JsonWebTokenError":
      status = 401
      message = "Invalid Token"
      break
      case "invalid access":
      status = 401
      message = "Login First"
      break
      case "SequelizeUniqueConstraintError":
      status = 400
      message = error.errors[0].message
      break
      case "User already subscribed":
      status = 400
      message = "User already subscribed"
      break
      default:
          break;
  }

  res.status(status).json({message})
  console.log(error, "<<< from error handler");
}

module.exports = errorHandler