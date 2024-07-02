const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const path = require("path");
const { app, server } = require("./SocketIO/socket");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// ---------------------------DEPLOYMENT---------------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../client/dist/", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome our chat APIs");
  });
}

// ---------------------------DEPLOYMENT---------------------------------------
/* CRUD
Create - app.post()
Read - app.get()
Update - app.put()
Delete - app.delete()
 */
app.get("/", (req, res) => {
  res.send("Welcome our chat APIs");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

server.listen(port, (req, res) => {
  console.log(`Server is nodemon on port ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Failed", err.message));
