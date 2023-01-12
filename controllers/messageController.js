const Message = require("../models/messageModel");

module.exports = class MessageController {
	static async sendChat(req, res, next) {
		console.log("test");
		try {
			const { content, chat } = req.body;
			const sender = req.user._id;

			console.log("test");
			const newMessage = await Message.create({
				chat,
				content,
				sender,
			});
			res.status(200).json(newMessage);
		} catch (error) {
			next(error);
		}
	}
};
