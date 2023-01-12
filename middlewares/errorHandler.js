async function errorHandler(error, req, res, next){
    console.log(error);
    let message = "Internal Server Error"
    let statusCode  = 500
  
    switch (error.name) {
          case 'SequelizeValidationError':
          case 'SequelizeUniqueConstraintError':
              statusCode = 400
              message = error.errors.map(el => el.message)[0]
          break;
          case 'SequelizeDatabaseError' :
              statusCode = 400
              message= "Please Check Your Input"
          break
          case "EmailPasswordRequired" :
              statusCode = 400
              message = "Email or Password Required"
          break;
          case "InvalidToken":
              statusCode = 401
              message = " Data Invalid Token"
          break
          case 'InvalidCredintials':
          case "InvalidEmailOrPassword":
              statusCode = 401
              message = "Invalid Email or Password"
          break
          case "AccessTokenInvalid":
              statusCode = 403
              message= "Access Denied"
          break
          case "DataNotFound":
              statusCode = 404
              message = "Data Not Found"
          break;
    }
    res.status(statusCode).json({message})
  }
  
  module.exports = {errorHandler}