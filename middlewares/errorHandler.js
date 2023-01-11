function errorHandler (error, request, response, next) {
    //jangan lupa di catch isi next(harus diisi agar dia masuk)
    console.log(error)
    let status
    let message

    switch(error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = error.errors[0].message
            break;

        case "InvalidEmailPassword":
            status = 400
            message = "Invalid email or password"
            break;

        case "Unauthenticated":
            status = 401
            message = "You need to login first"
            break;
        
        case "Unauthorized":
            status = 403
            message = "You are not authorized to access this page"
            break;

        case "NotFound":
            status = 404
            message = "Data not found"
            break;

        default:
            status = 500
            message = "Internal Server Error"
            break;
    }
    response.status(status).json({message})
}

module.exports = errorHandler