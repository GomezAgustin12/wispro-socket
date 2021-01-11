const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let numberConnections = [
  25,
  23,
  12,
  12,
  3,
  12,
  13,
  12,
  23,
  14,
  27,
  26,
  25,
  23,
  12,
  14,
  12,
  12,
  23,
  14,
  12,
  25,
  18,
  12,
  20,
  19,
  15,
  15,
  20,
  10,
];

io.on("connection", (socket) => {
  console.log("New client connected");
  numberConnections[0]++;

  socket.emit("FromAPI", numberConnections);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
