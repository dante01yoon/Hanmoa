import Router from "koa-router";

import * as RoomController from "./controller";

const roomRouter = new Router();
const {
  onCreateRoom,
  onGetLatestMessages,
} = RoomController;

roomRouter.post("/create",
  onCreateRoom,
);

roomRouter.get("/chat/:id",
  onGetLatestMessages,
)

export default roomRouter;