const Router = require('koa-router');
const signIn = require("./signIn");

const api = new Router();

api.use('/signIn', signIn.routes()); 

module.exports = api;