"use strict";

const questionController = require("../controller/questionController");
const authentication = require("../middleware/authentication");

const Router = require('koa-router');
const router = new Router({
	prefix: '/question'
});

  router.get("/", 
    questionController.getList
  )

  router.get("/:questionId", 
    questionController.getItem
  )

  router.post("/checkResult", 
    authentication.isLogged,
    questionController.checkResult
  )
module.exports = router

