const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();
const port = 3000;

// 重定向

router.get('/sign-in', (ctx, next) => {
  ctx.body = `<h1>已登录</h1>`;
});

router.get('/dog', (ctx, next) => {
  ctx.body = `${ctx.host}`;
});

router.all('/login', ctx => {
  ctx.redirect('/sign-in');  // 响应头中增加 Location: /sign-in，浏览器收到以后自动跳转
  ctx.status = 301;
});

router.all('/cat', ctx => {
  ctx.redirect('/dog');
  ctx.status = 302;
  ctx.message = 'Move Temporarily';   // 原 URI 处于“临时维护”状态，新的 URI 是起“顶包”作用的“临时工”。
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => console.log(`server running at http://localhost:${port}`));
