const Parameter = require("parameter");
const reponse = require("../utils/response");

const parameter = new Parameter();

exports.validateLogin = async (ctx, next) => {
  try {
    let { username, password } = ctx.request.body;

    let data = {
      username: username,
      password: password,
    };
    const rule = {
      username: "string",
      password: "password",
    };

    let error = parameter.validate(rule, data);
    if (error) return reponse.badRequest(ctx, { error });
    await next();
  } catch (error) {
    return reponse.error(ctx, { error });
  }
};



exports.validateCreate = async (ctx, next) => {
  try {
    let { username, password } = ctx.request.body;

    console.log(username,password)
    let data = {
      username: username,
      password: password,
    };
    const rule = {
      username: "string",
      password: "password",
    };

    let error = parameter.validate(rule, data);
    console.log(error)
    if (error) return reponse.badRequest(ctx, { error });

    await next();
  } catch (error) {
    return reponse.error(ctx, { error });
  }
};

exports.validateChangepassword = async (ctx, next) => {
  try {
    let { passwordOld, passwordNew } = ctx.request.body;

    let data = {
      passwordOld: passwordOld,
      passwordNew: passwordNew,
    };
    const rule = {
      passwordOld: "password",
      passwordNew: "password",
    };

    let error = parameter.validate(rule, data);
    if (error) return reponse.badRequest(ctx, { error });

    await next();
  } catch (error) {
    return reponse.error(ctx, { error });
  }
};
