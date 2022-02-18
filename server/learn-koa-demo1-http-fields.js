const Koa = require('koa');
const app = new Koa();
const port = 4000;

app.use((ctx, next) => {
  // status line
  ctx.status = 200;  // 返回404一样可以把正确数据传回去，说明服务端可以随意组合响应码和数据，只是一般要符合HTTP规范而已。
  ctx.message = 'OK';   // 原因短语也可以编辑
  // header
  ctx.type = 'html';   // Content-Type
  ctx.etag = 'md5hashsum';   // ETag
  ctx.lastModified = '2013-09-13';  // Last-Modified
  // 空行
  // body
  ctx.body = `<h1>Koa</h1>`;   // 即使只返回一个标签 h1，浏览器也能正确渲染html。因为收到 Content-Type 为 html 时，会自动补上 html的head body等
});

app.listen(port, () => console.log(`server running at http://localhost:${port}`));
