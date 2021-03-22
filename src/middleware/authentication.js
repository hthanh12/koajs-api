const config = require("../config");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const response = require("../utils/response");

exports.isLogged = async (ctx, next) => {
  try {
    const authHeader = ctx.request.header["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return response.unauthorized(ctx, { message: "Unauthorized" });
    let tokenInfo;
    await new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
          return response.unauthorized(ctx, { error: "Token is invalid" });
        }
        tokenInfo = decoded;
        resolve(tokenInfo);
      });
    });
    let user = await User.findByPk(tokenInfo.id);
    if (!user) return response.notFound(ctx, { error: "Not found user" });
    ctx.state.user = user;
    // console.log(ctx.state.user);
    await next();
  } catch (error) {
    return response.error(ctx, { error });
  }
};
