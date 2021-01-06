"use strict";

const fs = require("fs");

const Router = require("koa-router");
const apiRouter = new Router();

fs.readdirSync(__dirname).forEach(function (file) {
  if (file == "index.js") return;
  let name = file.substr(0, file.indexOf("."));
  let route = require("./" + name);
  apiRouter.use(route.routes(), route.allowedMethods());
});

apiRouter.get("/", async (ctx) => {
  ctx.body = {
    status: "success",
    message: "hello, index!",
  };
});

module.exports = apiRouter;
