const Koa = require("koa");
const Router = require("koa-router");
const dotenv = require("dotenv");
const api = require("./api");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");

dotenv.config(); 

console.log(process.env.MONGO_URI);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  (response) => {
    console.log('Successfully connected to mongodb');
  }
).catch(e => {
  console.error(e);
});

const app = new Koa();
const router = new Router(); 

// ctx 는 웹 요청과 응답에 대한 정보를 가지고 있음
// next는 다음 미들웨어를 실행시키는 함수
// 만약 미들웨어에서 next를 호출하지 않으면 요청처리를 완료하고 응답을 하게 됨. 
// next는 프로미스이다. 


router.use('/api', api.routes()); // api 라우트를 '/api'  경로 하위 라우트로 설정

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("hanmoa koa server is listening to port 5001"); 
})