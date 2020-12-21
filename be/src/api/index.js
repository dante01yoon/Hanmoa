import Router from "koa-router";
import auth from "./auth";
import user from "./user";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/users", user.routes()); 

export default api;