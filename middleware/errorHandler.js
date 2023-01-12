function handleError(err, req, res, next) {
    let status = 500
    let msg = 'Internal Server Error'

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            msg = err.errors[0].message
            break;
        case "EmailOrPasswordRequired":
            status = 400
            msg = 'Email or Password Required'
            break;
        case "InvalidCredentials":
            status = 401
            msg = 'Invalid Email or Password'
            break
        case "Unaunthenticated":
            status = 401
            msg = 'Unaunthenticated'
            break
        case "JsonWebTokenError":
            status = 401
            msg = 'Unaunthenticated'
            break
        case "Forbidden":
            status = 403
            msg = 'Forbidden'
            break
        case "NotFound":
            status = 404
            msg = 'Data Not Found'
            break
    }

    res.status(status).json({
        message: msg
    })

}
module.exports = handleError