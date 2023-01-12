function errorHandler(err, req, res, next) {
    let status = 500
    let msg = 'Internal Server Error'
    switch (err.name) {
        case "SequelizeValidationError":
            status = 400
            let validate = ''
            err.errors.forEach(element => {
                validate = element.message
            });
            msg = validate
            break;
        case "SequelizeUniqueConstraintError":
            status = 400
            let validateerr
            err.errors.forEach(element => {
                validateerr = element.message
            })
            msg = validateerr
            break;
        case '"already subscribed"':
            status = 400
            msg = 'You are a subscriber'
            break;
        case 'Unauthorized':
            status = 401
            msg = 'You have to login first'
            break;
        case 'JsonWebTokenError':
            status = 401
            msg = 'You have to login first'
            break;
        case 'invalidCredentials':
            status = 401
            msg = 'error invalid username or email or password'
            break;
        case 'Please fill requirement data':
            status = 401
            msg = 'error invalid username or email or password'
            break;
        default:
            break;
    }
    res.status(status).json({ message: msg })
}
module.exports = { errorHandler }