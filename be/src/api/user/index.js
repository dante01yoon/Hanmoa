import Router from "koa-router";
import userController from "./controller";

const userRouter = new Router();

/**
 * @param {string} name
 * @param {string} studentNumber
 * @param {string} picture
 * @param {string} email
 */
userRouter.post("/", userController.onCreateUser);
userRouter.get("/", userController.onGetUserByStudentNumber);

export default userRouter;