import { Server as ServerIO } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
export const socketLogic = (server) => {
  const io = new ServerIO(server, {
    cors: {
      origin: `${process.env.BASE_CORS_URL}`,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", (data) => {
      const { trackId, sender, message } = data;
      io.in(trackId).emit("message", { sender, message });
    });

    socket.on("disconnect", () => {});
  });
};
