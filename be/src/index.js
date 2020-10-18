const Koa = require("koa");
const Router = require("koa-router");
const api = require("./api");

const app = new Koa();
const router = new Router(); 

// ctx 는 웹 요청과 응답에 대한 정보를 가지고 있음
// next는 다음 미들웨어를 실행시키는 함수
// 만약 미들웨어에서 next를 호출하지 않으면 요청처리를 완료하고 응답을 하게 됨. 
// next는 프로미스이다. 


router.get('/', (ctx, next) => {
  ctx.body = "홈"; 
})

router.get('/about', (ctx, next) => {
  ctx.body = "소개"; 
})

router.get('/about:name', (ctx,next) => {
  const { name } = ctx.params; // 라우터 경로에서 :파라메터명으로 정의 된 값이 ctx.params로 정의됨 . 
  ctx.body = name + '의 소개'; 
})

router.get('/post', (ctx, next) => {
  const {id} = ctx.request.query; // 쿼리스트링 

  if( id) {
    ctx.body = '포스트 #' +id;
  }
}); 

router.use('/api', api.routes()); // api 라우트를 '/api'  경로 하위 라우트로 설정

app.use(router.routes()).use(router.allowedMethods());

app.listen(5001, () => {
  console.log("hanmoa koa server is listening to port 5001"); 
})