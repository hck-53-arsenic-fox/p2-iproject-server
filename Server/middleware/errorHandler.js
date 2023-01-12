module.exports = (err, req, res, next) => {
    
    console.log(err)
    switch(err.name){
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            let showErr = err.errors.map(ele => ele.message).join(', ')
            res.status(400).json({ message: showErr})
            break;
        case "EmailOrPasswordRequired":
            res.status(400).json({ message: "Email and Password Required"})
            break;
        case "InvalidToken":
            res.status(401).json({ message: "Invalid Token"})
        case "JSONTokenError":
            res.status(401).json({ message: "Invalid Token" })
        case "InvalidCredentials": 
            res.status(401).json({ message: "Invalid Email or Password"})
            break;
        case "AuthenticationError":
            res.status(401).json({ message: "Error at Authentication"})
            break;
        case "Forbidden":
            res.status(403).json({ message: "Forbidden Error at Authorization"})
            break;
        case "DataNotFound":
            res.status(404).json({ message: "Data not Found"})
            break;
        default:
            res.status(500).json({ message: "Internal Server Error"})
            break;
    }
}