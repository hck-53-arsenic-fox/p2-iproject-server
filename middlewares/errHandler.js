async function errHandler(err, req, res, next) {
     let status = 500;
     let message = "Internal server error";
    console.log(err);
     switch (err.name) {
          case "SequelizeUniqueConstraintError":
          case "SequelizeValidationError":
               status = 400;
               message = err.errors.map((el) => el.message);
               break;

          case "JsonWebTokenError":
          case "Unauthenticated":
               status = 401;
               message = "Invalid token";
               break;
          case "DataShowProductNotFound":
               status = 404;
               message = "Product not found";
               break;
          case "Wishlistnotfound":
               status = 404;
               message = "Wishlist not found";
               break;
          case "Cartnotfound":
               status = 404;
               message = "Cart not found";
               break;
          case "Categorynotfound":
               status = 404;
               message = "Category not found";
               break;
          case "UsernotFound":
               status = 404;
               message = "User not Found";
               break;

          default:
               break;
     }

     res.status(status).json({ message });
}

module.exports = errHandler;
