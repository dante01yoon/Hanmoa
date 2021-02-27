import Router from "koa-router";
import {
  onGetChat,
  onPostCreateChat,
  onDeleteChat,
} from "./controller";

const chatRouter = new Router();
chatRouter.post("/create",
  onPostCreateChat,
)
chatRouter.get("/",
  onGetChat,
)
chatRouter.delete("/delete/:id",
  onDeleteChat,
)

export default chatRouter; 