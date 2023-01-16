const mongoose = require("mongoose");
const argon2 = require("argon2");

const userModel = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (v) {
					let validRegex =
						/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
					return v.match(validRegex) ? true : false;
				},
				message: "Invalid email format",
			},
		},
		password: {
			type: String,
			required: true,
		},
		pic: {
			type: String,
			set: (value) => {
				if (!value) {
					return "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
				} else {
					return value;
				}
			},
		},
	},
	{
		timestamps: true,
	}
);

userModel.methods.matchPassword = async function (enteredPassword) {
	return await argon2.verify(this.password, enteredPassword);
};

userModel.pre("save", async function (next) {
	try {
		if (!this.isModified()) {
			next();
		} else {
			this.password = await argon2.hash(this.password);
		}
	} catch (error) {
		console.log(error);
	}
});

const User = mongoose.model("User", userModel);
module.exports = User;
