import Router from "koa-router";
import * as RoomController from "./controller";
import jwt from "../../middlewares/jwt";
import room from "../../models/room";

const roomRouter = new Router();
const {
  onCreateRoom,
  onGetRoom,
  onGetLatestMessages,
  onGetRooms,
  onPostRoomPasswordCheck,
  onPutJoinRoom,
  onPutLeaveRoom,
} = RoomController;

roomRouter.post("/create",
  jwt.decode,
  onCreateRoom,
);

roomRouter.get("/",
  onGetRooms,
)

roomRouter.get("/:category",
  onGetRooms,
)

roomRouter.get("/only/:id",
  onGetRoom,
)

roomRouter.get("/chat/:id",
  onGetLatestMessages,
)

roomRouter.post("/chat/:id/check",
  onPostRoomPasswordCheck,
)

roomRouter.put("/join",
  onPutJoinRoom
);

roomRouter.put("/leave",
  onPutLeaveRoom
)

export default roomRouter;