const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const router = require('./routers');
const config = require('./config');
const morgan = require('koa-morgan');
require('dotenv').config()

const PORT = process.env.PORT;
const environment = config.env;

app.use(morgan('combined'))

app.use(bodyParser());

app.use(router.routes(),router.allowedMethods());

// CORS ALL ACCESS
// app.disable("x-powered-by");


app.listen(PORT, () => {
  console.info(`[ApiServer] Listening on Port ${PORT} / at ${environment} Env`);
});


module.exports = app;