const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();
const port = 3000;

// 根路由
router.get('/', (ctx, next) => {
  ctx.body = `<h1>Koa router ready</h1>`;
  console.log('注意 路由 之间不是中间件，访问"非/"时，这里不会执行');
});

// 多级(params)访问
router.get(
  '/user/:category/:uuid',
  async (ctx, next) => {
    const p = ctx.params;
    const info = await new Promise(resolve => resolve({ category: p.category, uuid: p.uuid, name: 'Alex' }));
    ctx.state.info = info;  // info 通过 await 得到 resolve 的值;  挂载在 ctx.state，传给下一个中间件
    next();  // 执行 下一个中间件
  },
  ctx => {
    console.log('我就是下一个中间件，执行');
    ctx.body = JSON.stringify(ctx.state.info);
  }
);


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => console.log(`server running at http://localhost:${port}`));
