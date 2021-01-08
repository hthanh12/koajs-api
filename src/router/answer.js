"use strict";

const answerController = require("../controller/answerController");
const authentication = require("../middleware/authentication");

const Router = require('koa-router');
const router = new Router({
	prefix: '/answer'
});
  router.get('/', async (ctx) => {
    ctx.body = {
      status: 'success',
      message: 'hello, answer!'
    };
  })

  router.post("/checkResult", 
    answerController.checkResult
  )
module.exports = router

