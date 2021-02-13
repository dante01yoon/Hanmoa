import Router from "koa-router";
import auth from "./auth";
import user from "./user";
import room from "./room";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/users", user.routes()); 
api.use("/room", room.routes());
export default api;