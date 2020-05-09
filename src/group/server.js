const express = require("express");
const http = require("http");
const app = express();
const socket = require('socket.io');
const server = http.createServer(app);
const io = socket(server, {
  origins: '*:*'
});
const port = 3001;
const { generateMessage } = require("./utils/messages")
const {
  getUser,
  getUsersInRoom,
  addUser,
  removeUser
} = require("./utils/users")
// Timer implementation 
io.on("connection", socket => {
  socket.on('join', ({
      username,
      room
  }, callback) => {
      const {
          error,
          user
      } = addUser({
          id: socket.id,
          username,
          room
      })
      if (error) {
          return callback(error);
      }
      socket.join(user.room);
      socket.emit("message", generateMessage("Welcome", "Server"));
      socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has joined!`, "Admin"));
      io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room)
      })
  });
  socket.on("sendMessage", (msg) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", generateMessage(msg, user.username));
  });

  socket.on("sendPlay", () => {
    const user = getUser(socket.id);
    io.to(user.room).emit("play", socket.id);
  });

  socket.on("sendPause", () => {
    const user = getUser(socket.id)
    io.to(user.room).emit("pause", socket.id);
  })

  socket.on("sendReset", () => {
    const user = getUser(socket.id)
    io.to(user.room).emit("reset", socket.id);
  })

  socket.on("sendSwitchModes", () => {
    const user = getUser(socket.id)
    io.to(user.room).emit("switchModes", socket.id);
  })

  socket.on("sendSwitchContinue", () => {
    const user = getUser(socket.id)
    io.to(user.room).emit("switchContinue", socket.id);
  })

  socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
          io.to(user.room).emit('message', generateMessage(`${user.username} has disconnected`, "Admin"));
          io.to(user.room).emit("roomData", {
              room: user.room,
              users: getUsersInRoom(user.room)
          })
      }
  })
});

console.log('listening on port', port);
server.listen(port);
