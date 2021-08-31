export const config = {
  path: process.env.SOCKET_URL,
  cors: {
    origin: ["http://localhost:5000", "http://localhost:3000", process.env.CLIENT_URL],
  },
}

const initSocket = (io) => {
  io.on("connection", (socket) => {
    // roomJoin 이벤트
    socket.on("roomJoin", ({ roomId, userId }) => {
      console.log("roomId: ", roomId, "userId: ", userId);
      socket.join(roomId);
    });

    // sendMessage 이벤트
    socket.on("sendMessage", ({ ioId, roomId, message, time }) => {
      console.log("socket.id: ", socket.id);
      console.log("ioId: ", ioId);
      console.log("roomId: ", roomId, "message: ", message, "time: ", time);
      io.to(roomId).emit("sentMessage", { roomId, message, time });
    })

    // leaveRoom 이벤트
    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
    })

  })
}

export default initSocket;