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
  onPostLeaveRoom,
  onPutJoinRoom,
  onPutLeaveRoom,
} = RoomController;

roomRouter.post("/create",
  jwt.forceGuardDecode,
  onCreateRoom,
);

roomRouter.get("/",
  jwt.decode,
  onGetRooms,
)

roomRouter.get("/:category",
  jwt.decode,
  onGetRooms,
)

roomRouter.get("/only/:id",
  jwt.decode,
  onGetRoom,
)

roomRouter.get("/chat/:id",
  onGetLatestMessages,
)

roomRouter.post("/check/:id",
  onPostRoomPasswordCheck,
)

roomRouter.put("/join",
  jwt.forceGuardDecode,
  onPutJoinRoom,
);

roomRouter.post("/leave",
  jwt.forceGuardDecode,
  onPostLeaveRoom,
)

roomRouter.put("/leave",
  jwt.forceGuardDecode,
  onPutLeaveRoom,
)

export default roomRouter;