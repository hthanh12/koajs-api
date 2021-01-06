"use strict";

const userController = require("../controller/userController");
const authentication = require("../middleware/authentication");
const validateUser = require("../middleware/userValidate");

module.exports = (router) => {
  // router.route("/user")
  //   .post(validateUser.validateCreate, 
  //       userController.create);
  router.get('/', async (ctx) => {
    ctx.body = {
      status: 'success',
      message: 'hello, user!'
    };
  })
  // router.route("/login")
  //   .post(validateUser.validateLogin, 
  //       userController.login);

  // router
  //   .route("/checkToken")
  //   .get(authentication.isLogged, 
  //       userController.checkToken);

  // router
  //   .route("/user/password")
  //   .put(validateUser.validateChangepassword, 
  //       authentication.isLogged, 
  //       userController.changePassword);

  return router;
};
