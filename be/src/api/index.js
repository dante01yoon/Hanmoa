const Router = require('koa-router');
const auth = require("api/auth");

const api = new Router();

api.use('/auth', auth.routes());

module.exports = api;