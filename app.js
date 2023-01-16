if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;

const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");

connectDB();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("hi");
});

app.use("/api/user", userRoute);
app.use("/api/chat", authentication, chatRoute);
app.use("/api/message", authentication, messageRoute);
// app.post("api/message", (req, res) => {
// 	console.log("test");
// });

// app.get("/api/chat", (req, res) => {
// 	console.log("sure");
// 	res.send(chats);
// });
// app.get("/api/chat:id", (req, res) => {
// 	const singleChat = chats.find((c) => c._id === req.params.id);
// 	res.send(singleChat);
// });

// app.get('/')

app.use((req, res, next) => {
	try {
		throw { name: "404 Route" };
	} catch (error) {
		next(error);
	}
});
app.use(errorHandler);

app.listen(port, () => {
	console.log(`\nServer is listening on port  ${port}`.cyan);
});
