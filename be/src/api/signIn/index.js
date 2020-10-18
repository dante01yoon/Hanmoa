const Router = require("koa-router");
const { list, create, remove, replace, update } = require("./controller");

const signIn = new Router();

signIn.get('/', (ctx, next) =>{
  ctx.body = 'GET ' + ctx.request.path;
})


signIn.get('/create', create);

module.exports = signIn;