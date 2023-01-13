const { generateToken } = require("../helpers/jwt");
const colors = require("colors");
const User = require("../models/userModel");

class UserController {
	static async registerUser(req, res, next) {
		try {
			const { name, email, password, pic } = req.body;
			if (!name || !email || !password) {
				throw {
					name: "Please Enter all the Fields",
				};
			}
			const userExists = await User.findOne({ email });

			if (userExists) {
				throw { name: "User already exists" };
			}

			const user = await User.create({
				name,
				email,
				password,
				pic,
			});

			if (user) {
				res.status(201).json({
					_id: user._id,
					name: user.name,
					email: user.name,
					pic: user.pic,
					token: generateToken(user._id),
				});
			} else {
				throw { name: "Failed to create the User" };
			}
		} catch (error) {
			next({
				name: error.errors.email.properties.message,
			});
		}
	}

	static async loginUser(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				throw {
					name: "Please Enter all the Fields",
				};
			}
			const user = await User.findOne({ email: email });
			if (!user || !(await user.matchPassword(password))) {
				throw {
					name: "Invalid user or password",
				};
			}
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				pic: user.pic,
				token: generateToken(user._id),
			});
		} catch (error) {
			next(error);
		}
	}

	static async getAllUsers(req, res, next) {
		try {
			const keyword = req.query.search
				? {
						$or: [
							{
								name: {
									$regex: req.query.search,
									$options: "i",
								},
							},
							{
								email: {
									$regex: req.query.search,
									$options: "i",
								},
							},
						],
				  }
				: {};

			const users = await User.find(keyword).find({
				_id: { $ne: req.user._id },
			});

			res.status(200).json(users);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async getOneUser(req, res, next) {
		try {
			const { id } = req.params;
			const user = await User.findById(id);
			res.status(200).json(user);
		} catch (error) {
			if (error.name === "CastError") {
				return res.status(200).json({});
			}
			next(error);
		}
	}

	static async updatePic(req, res, next) {
		try {
			const { _id } = req.user;
			const { pic } = req.body;
			const user = await User.findOneAndUpdate(
				{ _id },
				{ pic },
				{ new: true }
			);

			res.status(200).json({
				message: "Profile picture has been successfully updated",
			});
		} catch (error) {
			if (error.name === "CastError") {
				return res.status(404).json({ message: "Id does not exist" });
			}
			next(error);
		}
	}
}

module.exports = {
	UserController,
};
