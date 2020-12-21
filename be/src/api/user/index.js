import Router from "koa-router";
import userController from "./controller";
import jwt from "../../middlewares/jwt";

const userRouter = new Router();

userRouter.get("/", userController.onGetUserByStudentNumber);
userRouter.get("/all", userController.onGetAllUsers);
userRouter.post("/signIn", jwt.encode, userController.postLogin);
userRouter.post("/signUp", userController.onCreateUser);
userRouter.delete("/:id", userController.onDeleteUserById);
export default userRouter;