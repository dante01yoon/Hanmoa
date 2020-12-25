import Router from "koa-router";
import compose from "koa-compose";
import userController from "./controller";
import * as authController from "../auth/controller";
import jwt from "../../middlewares/jwt";
import { getProfileFromGoogle } from "../../middlewares/googleAuth";

const userRouter = new Router();

userRouter.get("/token", 
  jwt.decode,
  userController.onGetUserByToken
);
<<<<<<< HEAD
userRouter.get("/:id",
  jwt.decode,
  userController.onGetUserByStudentNumber
);
=======
userRouter.get("/", userController.onGetUserByStudentNumber);
>>>>>>> 7b1a554... Update: POST signIn 작성 -오류 없음
userRouter.get("/all", userController.onGetAllUsers);
userRouter.post("/signIn",
  getProfileFromGoogle,
  jwt.encode,
  userController.postLogin
);
userRouter.post("/signUp", userController.onCreateUser);
userRouter.delete("/:id", userController.onDeleteUserById);
export default userRouter;