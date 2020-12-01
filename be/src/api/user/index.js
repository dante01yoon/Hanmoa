import Router from "koa-router";
import userController from "./controller";

const userRouter = new Router();

userRouter.post("/", userController.onCreateUser);
userRouter.get("/single", userController.onGetUserByStudentNumber);
userRouter.get("/", userController.onGetAllUsers);

export default userRouter;