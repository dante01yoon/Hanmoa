const Router = require("koa-router");

const auth = new Router();
const authController = require("api/auth/controller");

auth.post('/signIn', authController.loginAndRegister);
auth.get('/signOut', authController.logout);
auth.get('/check', authController.check);

module.exports = auth;