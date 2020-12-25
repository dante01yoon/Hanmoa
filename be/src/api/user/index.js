import Router from "koa-router";
import compose from "koa-compose";
import userController from "./controller";
import jwt from "../../middlewares/jwt";
import { getProfileFromGoogle } from "../../middlewares/googleAuth";

const userRouter = new Router();

userRouter.get("/token", 
  jwt.decode,
  userController.onGetUserByToken
);
userRouter.get("/", userController.onGetUserByStudentNumber);
userRouter.get("/all", userController.onGetAllUsers);
userRouter.post("/signIn",
  getProfileFromGoogle,
  jwt.encode,
  userController.postLogin
);
userRouter.post("/signUp", userController.onCreateUser);
userRouter.delete("/:id", userController.onDeleteUserById);
export default userRouter;