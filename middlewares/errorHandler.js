async function errorHandler(err, req, res, next) {
	console.log(err);
	let message = "Internal server error";
	let status = 500;

	switch (err.name) {
		case "Please Enter all the Fields":
		case "Failed to create the User":
		case "User already exists":
		case "Invalid email format":
		case "More than 2 users are required to form a group chat":
			status = 400;
			message = err.name;
			break;
		case "Invalid user or password":
		case "Invalid token":
		case "Not authorized, no token":
		case "UserId param not sent with the request":
			status = 401;
			message = err.name;
			break;
		case "JsonWebTokenError":
		case "TokenExpiredError":
			status = 401;
			message = "Invalid Token";
			break;
		case "Chat not found":
			status = 404;
			message = err.name;
			break;
		case "404 Route":
			status = 404;
			message = "This Route does not exists!";
			break;
	}

	res.status(status).json({ message });
}

module.exports = errorHandler;
