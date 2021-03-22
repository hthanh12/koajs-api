"use strict";

const answerController = require("../controllers/answerController");
const authentication = require("../middleware/authentication");

const Router = require('koa-router');
const router = new Router({
	prefix: '/answer'
});

router.get("/", async (ctx) => {
  ctx.body = {
    status: "success",
    message: "hello, answer!",
  };
});

  router.get("/sameResult/:questionId/:answerList", 
    authentication.isLogged,
    answerController.sameResult
  )
module.exports = router

