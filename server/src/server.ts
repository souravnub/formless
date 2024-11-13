//Using Socket.io documentation
import http from "http";
import { Server } from "socket.io";
import os from "os";

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("A user Disconnected:", socket.id);
  });
});
const PORT = Number(process.env.PORT) || 3005;
httpServer.listen(PORT, "0.0.0.0", undefined, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Retrieve network interfaces and log IP addresses
const interfaces = os.networkInterfaces();

for (const interfaceName in interfaces) {
  // TODO: What is type of interfaces[interfaceName]?
  for (const net of interfaces[interfaceName] as any) {
    if (net.family === "IPv4" && !net.internal) {
      console.log(`Server IP Address: ${net.address}:${PORT}`);
    }
  }
}
