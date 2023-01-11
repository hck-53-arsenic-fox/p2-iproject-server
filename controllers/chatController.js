const Chat = require("../models/chatModel");
const User = require("../models/userModel");

class ChatController {
	static async accessChat(req, res, next) {
		try {
			const { userId } = req.body;

			if (!userId) {
				throw {
					name: "UserId param not sent with the request",
				};
			}

			//? Find Chat between user A and B, include all populated data

			let isChat = await Chat.find({
				isGroupChat: false,
				$and: [
					{ users: { $elemMatch: { $eq: req.user._id } } },
					{ users: { $elemMatch: { $eq: userId } } },
				],
			})
				.populate("users", "-password")
				.populate("latestMessage");

			isChat = await User.populate(isChat, {
				path: "latestMessage.sender",
				select: "name pic email",
			});

			//?If Chat is found, send that chat
			if (isChat.length) {
				return res.status(200).json(isChat[0]);
			}

			//? Otherwise, create new chat
			const createdChat = await Chat.create({
				chatName: "sender",
				isGroupChat: false,
				users: [req.user._id, userId],
			});

			const fullChat = await Chat.findOne({
				_id: createdChat._id,
			}).populate("users", "-password");

			res.status(200).json(fullChat);
		} catch (error) {
			next(error);
		}
	}

	static async fetchChat(req, res, next) {
		try {
			let chat = await Chat.find({
				users: { $elemMatch: { $eq: req.user._id } },
			})
				.populate("users", "-password")
				.populate("groupAdmin", "-password")
				.populate("latestMessage")
				.sort({ updatedAt: -1 });

			chat = await User.populate(chat, {
				path: "latestMessage.sender",
				select: "name pic email",
			});
			res.status(200).json(chat);
		} catch (error) {
			next(error);
		}
	}

	static async createGroupChat(req, res, next) {
		try {
			let { users, name } = req.body;
			if (!users || !name) {
				throw {
					name: "Please Enter all the Fields",
				};
			}

			if (users.length < 2) {
				throw {
					name: "More than 2 users are required to form a group chat",
				};
			}

			users.push(req.user);

			const groupChat = await Chat.create({
				chatName: req.body.name,
				users: users,
				isGroupChat: true,
				groupAdmin: req.user,
			});

			const fullGroupChat = await Chat.findOne({
				_id: groupChat._id,
			})
				.populate("users", "-password")
				.populate("groupAdmin", "-password");

			res.status(201).json(fullGroupChat);
		} catch (error) {
			next(error);
		}
	}

	static async renameGroup(req, res, next) {
		try {
			const { chatId, chatName } = req.body;
			if (!chatId || !chatName) {
				throw { name: "Please Enter all the Fields" };
			}

			const updatedChat = await Chat.findByIdAndUpdate(
				chatId,
				{ chatName },
				{ new: true }
			)
				.populate("users", "-password")
				.populate("groupAdmin", "-password");

			if (!updatedChat) {
				throw {
					name: "Chat not found",
				};
			}
			res.status(200).json(updatedChat);
		} catch (error) {
			next(error);
		}
	}

	static async removeFromGroup(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}

	static async addToGroup(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ChatController;
