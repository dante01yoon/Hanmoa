const Router = require("koa-router");
const { list, create, remove, replace, update } = require("./controller");

const signIn = new Router();

signIn.get('/', list);
signIn.post('/', create);

module.exports = signIn;