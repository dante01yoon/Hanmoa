import React, { useContext, FC, createContext } from "react";

import { io } from "socket.io-client";

const socket = io(process.env.SOCKET_URL || "ws://localhost:5001")
const socketContext = createContext<{ io: typeof socket } | null>(null);

export const useSocketContext = () => {
  const socketState = useContext(socketContext);

  if (!socketState) {
    throw Error("SocketProvider is not given");
  }
  return socketState;
}

const SocketProvider: FC = ({ children }) => {
  const { Provider } = socketContext;

  return (
    <Provider value={{ io: socket }}>
      {children}
    </Provider>
  )
}

export default SocketProvider;