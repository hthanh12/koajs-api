"use strict";

const questionController = require("../controllers/questionController");
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

  router.post("/", 
    authentication.isLogged,
    questionController.createItem
  )

  router.put("/:questionId", 
    authentication.isLogged,
    questionController.updateItem
  )

  router.delete("/:questionId", 
    authentication.isLogged,
    questionController.deleteItem
  )


  
module.exports = router

