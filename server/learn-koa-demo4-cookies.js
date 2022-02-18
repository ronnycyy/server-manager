const http = require('http');
const Koa = require('koa');
const KeyGrip = require('keygrip');

const app = new Koa();

// 设置一个签名 Cookie 的密钥
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

app.use(async ctx => {
  ctx.cookies.set('id', '666', { signed: false, httpOnly: false });  // document.cookie 可以访问
  ctx.cookies.set('age', '18', { signed: false, httpOnly: true });  // 设置 httpOnly 以后，document.cookie 不可访问
  ctx.cookies.set('name', 'tobi', { signed: true });  // 带签名
  ctx.body = JSON.stringify({ name: 'check cookies' });
})

http.createServer(app.callback()).listen(3000);