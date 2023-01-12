const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function authentication(req, res, next) {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.id).select("-password");
			if (!user) {
				throw {
					name: "Invalid token",
				};
			}
			req.user = user;
		}

		if (!token) {
			throw {
				name: "Not authorized, no token",
			};
		}
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = authentication;
