import Koa from "koa";
import Router from "koa-router";
import dotenv from "dotenv";
import api from "./api";
import HanmoaMongoDB from "./lib/mongoose";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { createServer } from "http";
import socketIo, { Server } from "socket.io";
import initSocket, { config } from "./lib/socket";

const { jwtMiddleware } = require("./lib/token");

dotenv.config();
// mongoose 연결
const hanmoaMongoDB = new HanmoaMongoDB();
hanmoaMongoDB.run();

const app = new Koa();
const router = new Router();
// socket io 
const httpServer = createServer(app.callback());

app.use(bodyParser());

// jwtMiddleware 적용 
app.use(jwtMiddleware);

// cors 
function verifyOrigin(ctx) {
  const origin = ctx.headers.origin;
  const allowedOrigins = ["http://localhost:5000", "http://localhost:3000"];

  if (!allowedOrigins.includes(origin)) {
    return false;
  }

  return origin;
}

// cors 세팅
app.use(cors({
  origin: verifyOrigin,
  credentials: true,
}));

const io = new Server(httpServer, config);

// ctx 는 웹 요청과 응답에 대한 정보를 가지고 있음
// next는 다음 미들웨어를 실행시키는 함수
// 만약 미들웨어에서 next를 호출하지 않으면 요청처리를 완료하고 응답을 하게 됨. 
// next는 프로미스이다. 
router.use('/api',
  (ctx, next) => {
    console.log("ctx.headers in /api: ", ctx.headers);
    console.log("ctx.cookies in /api: ", ctx.cookies);
    return next();
  },
  api.routes()); // api 라우트를 '/api'  경로 하위 라우트로 설정

app.use(router.routes()).use(router.allowedMethods());

initSocket(io);

const port = process.env.PORT || 5001;

httpServer.listen(port, () => {
  console.log("hanmoa koa server is listening to port 5001");
})
