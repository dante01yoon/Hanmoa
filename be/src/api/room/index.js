import Router from "koa-router";
import * as RoomController from "./controller";
import jwt from "../../middlewares/jwt";

const roomRouter = new Router();
const {
  onCreateRoom,
  onGetRoom,
  onGetLatestMessages,
  onGetRooms,
} = RoomController;

roomRouter.post("/create",
  jwt.decode,
  onCreateRoom,
);

roomRouter.get("/",
  onGetRooms,
)

roomRouter.get("/:id",
  onGetRoom,
)

roomRouter.get("/chat/:id",
  onGetLatestMessages,
)

export default roomRouter;