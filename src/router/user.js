"use strict";

const userController = require("../controller/userController");
const authentication = require("../middleware/authentication");
const validateUser = require("../middleware/userValidate");
const Router = require('koa-router');
const router = new Router({
	prefix: '/user'
});
  router.post("/", 
     validateUser.validateCreate,
     userController.create
  )

  router.get('/', async (ctx) => {
    ctx.body = {
      status: 'success',
      message: 'hello, user!'
    };
  })

  router.post("/login", 
    validateUser.validateLogin,
    userController.login
  )

  router.get("/checkToken", 
    authentication.isLogged, 
    userController.checkToken);

  router.put(
    "/password",
    validateUser.validateChangepassword,
    authentication.isLogged,
    userController.changePassword
  );

  router.delete(
    "/",
    authentication.isLogged,
    userController.deleteUser
  );

module.exports = router

