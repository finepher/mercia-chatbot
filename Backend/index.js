const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const ws = require("./webSocket/socket");
const connectDB = require("./config/database");

dotenv.config();

const socket = new Server(3001, {
  cors: "*",
});

socket.on("connection", ws);

// express server settings

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`✅ server running on port ${PORT}`);
})
});
