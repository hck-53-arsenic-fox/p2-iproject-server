const errorHandler = (err, req, res, next) => {
    console.log(err);
    let message = 'Internal server error'
    let statusCode = 500

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            message = err.errors[0].message
            statusCode = 400
            break;
        case 'INVALID_LOGIN':
            message = 'Invalid email/password'
            statusCode = 400
            break;
    }

    res.status(statusCode).json({message})
};

module.exports = { errorHandler };
