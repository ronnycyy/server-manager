const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const port = 3000;

// 为所有路由添加前缀
const router = new Router({
  prefix: '/users'
});

 // responds to "/users"
router.get('/', ctx => {
  ctx.body = JSON.stringify(ctx.params);
});

// responds to "/users/:id"
router.get('/:id', ctx => {
  ctx.body = JSON.stringify(ctx.params);
}); 

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => console.log(`server running at http://localhost:${port}`));
