const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const port = 3000;

const forums = new Router();
const posts = new Router();

posts.get('/', (ctx, next) => {
  ctx.body = `${ctx.path}`;
});

posts.get('/:pid', (ctx, next) => {
  ctx.response.set({ 'Content-Type': 'application/json', 'Etag': '1234' });
  ctx.body = JSON.stringify(ctx.params);
});

// 嵌套上面两个 posts 的路由
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());

app.listen(port, () => console.log(`server running at http://localhost:${port}`));
