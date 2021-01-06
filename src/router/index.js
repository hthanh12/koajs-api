 
'use strict';

// const fs = require('fs');

// // const modules = ['user']
// // module.exports = (app) => {
// //     for (let module of modules) {
// //         app.use(`/`, require(`./${module}`)(router));
// //     }
// // };


// module.exports = (app) => {
//     fs.readdirSync(__dirname).forEach(function(file) {
//         if (file == "index.js") return;
//         let name = file.substr(0, file.indexOf('.'));
//         require('./' + name)(app);
//     });
// };

const Router = require('koa-router');
let routerIndex = new Router();
// console.log('123',router);
// let router = require('./user');

routerIndex.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, index!'
  };
})

module.exports = routerIndex;