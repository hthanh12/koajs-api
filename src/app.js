const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const indexRoutes = require('./router');
const config = require('./config')
require('dotenv').config()
console.log(config)
const PORT = process.env.PORT;
const environment = config.env;

// app.use(morgan('combined'))

app.use(bodyParser());
// app.get("/", ctx => {
//   res.send(`Listening on Port ${PORT} / at ${environment} Env `);
// });

app.use(indexRoutes.routes(),indexRoutes.allowedMethods());

// CORS ALL ACCESS
// app.disable("x-powered-by");


app.listen(PORT, () => {
  console.info(`[ApiServer] Listening on Port ${PORT} / at ${environment} Env`);
});

module.exports = app;