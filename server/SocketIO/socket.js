/* const { Server } = require("socket.io");

const io = new Server({ cors: "https://textlive.onrender.com/" });
let onlineUsers = [];
io.on("connection", (socket) => {
  console.log("New Connection", socket.id);
  // listen to connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    // console.log("onlineUser", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // Add Message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user?.socketId !== socket?.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
 */
// io.listen(5000);

const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://textlive.onrender.com/",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];
io.on("connection", (socket) => {
  // console.log("New Connection", socket.id);
  // listen to connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    // console.log("onlineUser", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // Add Message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user?.socketId !== socket?.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

module.exports = { app, io, server };
