const koa = require('koa');
const app = new koa();
const port = 3000;

app.use(async (ctx, next) => {
  // (1) 进入 logger 中间件
  var start = new Date;
  await next();
  // (3) 回到 logger 中间件
  var ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
  
  // (4) 返回 HTTP 响应体 ctx.body = 'onion model'  ⚠️⚠️⚠️ 这个时候响应才回去!!!
});

app.use(async (ctx, next) => {
  // (2) 进入 response 中间件
  ctx.body = 'onion model';
  await next();
});

// app.listen 实际上运行的是
// http.createServer(app.callback()).listen(3000);
app.listen(port, () => console.log(`
  env: ${app.env}
  proxy: ${app.callback}
  =================================================
  🍺 Server running at http://localhost:${port}
`));