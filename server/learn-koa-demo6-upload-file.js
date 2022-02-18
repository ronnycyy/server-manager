const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body')
const progress = require('progress-stream')
const fs = require('fs')
const path = require('path')

const app = new Koa();
const router = new Router();
const port = 3000;


app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));

router.get('/', ctx => {
  ctx.type = 'html';
  ctx.body = `
    <h3>上传文件</h3>
    <form action="/uploadfile" method="post" enctype="multipart/form-data">
      <input type="file" name="file" id="file" value="" multiple="multiple" />
      <input type="submit" value="提交"/>
    </form>
  `
})

router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, 'upload/') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 监控进度
  const watch = progress({
    length: file.size,
    time: 100
  });
  watch.on('progress', function (progress) {
    console.log(progress);
  })

  // 可读流通过管道写入可写流
  reader
    .pipe(watch)
    .pipe(upStream);

  ctx.body = "success";
});

app.use(
  router.routes(),
  router.allowedMethods()
)

app.listen(port, () => console.log(`server running at http://localhost:${port}`));
