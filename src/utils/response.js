"use strict";

/**
 * HTTP Status codes
 */
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const toResponse = (statusCode, params = {}) => {
  const {
    code = null,
    data = null,
    error = null,
    message = null,
    cpu_time = null,
  } = params;

  if (statusCode >= 200 && statusCode < 400) {
    return {
      status: "success",
      data,
    };
  }

  if (statusCode >= 400 && statusCode < 500) {
    return {
      status: "error",
      error,
    };
  } else {      
    return {
      status: statusCode < 500 ? "fail" : "error",
      error,
    };
  }
};

/**
 * Utility Class to easily make ExpressJS Response
 */
class Response {
  static get STATUS_CODES() {
    return STATUS_CODES;
  }

  //  OK: 200
  static success(ctx, params = {}) {
    ctx.status = params.statusCode || ctx.status;
    if (ctx.status >= 400) {
      ctx.status = this.STATUS_CODES.OK;
    }
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static fail(ctx, params = {}) {
    ctx.status = params.statusCode || ctx.status;
    if (ctx.status < 400 || status >= 500) {
      ctx.status = this.STATUS_CODES.BAD_REQUEST;
    }
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static error(ctx, params = {}) {
    ctx.status = params.statusCode || ctx.status;
    if (ctx.status < 500) {
      ctx.status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;
    }
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static ok(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.OK;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static created(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.CREATED;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static noContent(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.NO_CONTENT;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static badRequest(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.BAD_REQUEST;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static unauthorized(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.UNAUTHORIZED;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static forbidden(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.FORBIDDEN;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static notFound(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.NOT_FOUND;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static requestTimeout(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.REQUEST_TIMEOUT;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static conflict(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.CONFLICT;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }

  static internalServerError(ctx, params = {}) {
    ctx.status = this.STATUS_CODES.INTERNAL_SERVER_ERROR;
    ctx.body = toResponse(ctx.status, params);
    return ctx.body;
  }
}

module.exports = Response;
