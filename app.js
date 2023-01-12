if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const router = require("./router");
const http = require('http')
const { errorHandler } = require("./helpers/helpers");

app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = require("http").createServer(app);
const options = { cors: { origin: "*"}};
const io = require("socket.io")(httpServer, options);

app.use(router);
app.use(errorHandler)


io.on("connection", (socket) => {
  console.log(`user has been connected`);

  socket.on("disconnect", () => {
      console.log(`user has been disconnected`);
  })

  socket.on('test', (data) => {
      console.log(`${data} ---DITERIMA DARI CLIENT`);
  })

  socket.on('message', (data) => {
      // broadcasting message to all connected client
      io.emit('messageReceived', data)
  })
})

httpServer.listen(port, () => {
  console.log(`Running on port ${port}`);
});

