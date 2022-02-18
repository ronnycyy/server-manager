const http = require('http');
const Koa = require('koa');
const body = require('koa-body');  

const app = new Koa();

app.use(body());  // 原生koa无法处理request body，需借助第三方中间件
app.use(async ctx => {
  ctx.body = JSON.stringify(ctx.request.body);
})

http.createServer(app.callback()).listen(3000);