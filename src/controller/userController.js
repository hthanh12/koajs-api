const { User } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const response = require("../utils/response");

exports.login = async (ctx) => {
  try {
    let { username, password } = ctx.request.body;
    let user = await User.findOne({ where: { username } });

    if (!user) return ctx.notFound(ctx, { error: "Not found user" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return response.unauthorized(ctx, { error: "Wrong password" });
    let token = jwt.sign({ id: user.id }, config.jwt_secret);

    delete user.dataValues.password;
    return response.success(ctx, { data: { token, user } });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.create = async (ctx) => {
  try {
    let { password, username } = ctx.request.body;
    let hashPwd = await bcrypt.hash(password, 256);

    let user = await User.findOne({ where: { username: username } });

    if (user)
      return response.conflict(ctx, { error: "Username already exists" });

    let createUser = await User.create({
      username,
      password: hashPwd,
      status: 1
    });

    return response.created(ctx, { data: createUser });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.delete = async (ctx) => {
  try {
    
    let user = await User.findOne({ where: { username: username } });
    if (!user)
      return response.notFound(ctx, { error: "Not found user" });

    // update database
    const userDelete = await User.update(
      { status: 2 },
      { where: { id: user.id } }
    );

    return response.success(ctx, { data: "Delete user success" });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.checkToken = async (ctx) => {
  try {
    let user = ctx.state.user;
    delete user.dataValues.password;
    if (!user) return response.notFound(ctx, { error: "Not found user" });

    return response.success(ctx, { data: user });
  } catch (error) {
    return response.error(ctx, { error });
  }
};

exports.changePassword = async (ctx) => {
  try {
    let user = ctx.state.user;
    let { passwordOld, passwordNew } = ctx.request.body;
    // check password
    const match = await bcrypt.compare(passwordOld, user.dataValues.password);
    if (!match) return response.unauthorized(ctx, { error: "Wrong password" });

    let hashPwd = await bcrypt.hash(passwordNew, 256);

    // update database
    const userUpdate = await User.update(
      { password: hashPwd },
      { where: { id: user.id } }
    );
    
    // delete field sensitive information
    delete user.dataValues.password;

    return response.success(ctx, { data: "Change password success" });
  } catch (error) {
    return response.error(ctx, { error });
  }
};
