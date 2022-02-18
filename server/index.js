const koa = require("koa");
const path = require("path");
const Router = require('@koa/router');
const static = require("koa-static");
const body = require("koa-body");
const cors = require('@koa/cors');
const fs = require("fs");
const http = require("http");
const api = require("./api");

const app = new koa();
const server = http.createServer(app.callback());
const router = new Router();
const port = 4000;

// 跨域
app.use(cors());
// 解析HTTP body; 支持 文件上传
app.use(body({ multipart: true }));
// 提供静态资源，否则main.js, main.css回不去
app.use(static(path.resolve(__dirname, '../dist')));
app.use(static(path.resolve(__dirname, './socket.io')));

router.get('/', ctx => {
  ctx.type = 'html';
  ctx.body = `
    <h3>上传文件</h3>
    <form action="/file" method="post" enctype="multipart/form-data">
      <input type="file" name="file" id="file" value="" multiple="multiple" />
      <input type="submit" value="提交"/>
    </form>
  `;
});

// API
app.use(api(router)).use(router.allowedMethods());


server.listen(port, () => {
  console.log(`bff server listened: ${port}`);
})
