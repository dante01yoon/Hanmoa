export const config = {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:3000"],
  },
}

const initSocket = (io) => {
  io.on("connection", (socket) => {
    // room id 확인
    console.log("socket.id: ", socket.id);

    // roomJoin 이벤트
    socket.on("roomJoin", ({ roomId, userId }) => {
      console.log("roomId: ", roomId, "userId: ", userId);
      socket.join(roomId);
    });

    // sendMessage 이벤트
    socket.on("sendMessage", ({ roomId, message }) => {
      console.log("roomId: ", roomId, "message: ", message);
      io.to(roomId).emit("sentMessage", { roomId, message });
    })

    // leaveRoom 이벤트
    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId)
    })
  })
}

export default initSocket;