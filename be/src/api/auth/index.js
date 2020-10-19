const Router = require("koa-router");

const auth = new Router();
const authController = require("api/auth/controller");

auth.post('/signIn', authController.loginAndRegister);
auth.get('/signIn', (ctx,next) => {
  ctx.body = '/api/auth/signIn'
})
module.exports = auth;