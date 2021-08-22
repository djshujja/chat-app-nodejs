const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
var cors = require("cors");
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const chatRoutes = require("./routes/chatRoutes.js");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./routes/userRoutes.js");

const port = process.env.PORT || 5000;
app.use(cors());

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, cb) => {
    const data = addUser({ id: socket.id, name, room });
    // if (data.error) {
    //   console.log("Error in the join function");
    //   console.log(error);
    //   cb({ error: error });
    // }
    let user = data;
    socket.emit("message", { user: "admin", text: "Welcome to chat-app!" });
    console.log(user);
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    socket.join(user.room);
    cb();
  });

  socket.on("sendMessage", (msg, cb) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: msg });
    cb();
  });

  socket.on("disconnectUser", () => {
    console.log("disconnected!");
  });
});
app.use("/", chatRoutes);

server.listen(port, () => {
  console.log(`listening to ${port}`);
});
