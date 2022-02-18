const http = require('http');
const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

app.use(async ctx => {
  ctx.body = `<h1>错误处理</h1>`;  // koa检查出这是一个html文本，所以发 Content-Type: text/html; charset=utf-8
  fs.readFileSync('pathNotFound');
  console.log('我不会执行');
});

app.on('error', function(err,ctx){
  console.log(' 错误信息📝', err);  // Error: ENOENT: no such file or directory, open 'pathNotFound'
  console.log(' 报错背景🍺', ctx);
});

http.createServer(app.callback()).listen(3000);