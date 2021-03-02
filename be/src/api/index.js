import Router from "koa-router";
import auth from "./auth";
import user from "./user";
import room from "./room";
import chat from "./chat";
import topic from "./topic";

const api = new Router();
api.use("/auth", auth.routes());
api.use("/users", user.routes()); 
api.use("/room", room.routes());
api.use("/chat", chat.routes());
api.use("/topic", topic.routes());
export default api;