const Router = require("koa-router");

const auth = new Router();
const authController = require("api/auth/controller");

auth.post('/signIn', authController.loginAndRegister);
auth.get('/signOut', authController.logout);

module.exports = auth;