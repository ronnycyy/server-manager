const { createReadStream, createWriteStream } = require("fs");
const { join } = require("path");
const progress = require('progress-stream');
const rpcClient = require("./rpc-client");

function getStatus() {
  return new Promise((resolve, reject) => {
    const mock = {
      load: 0.1,
      cpu: 0.2,
      memory: 0.3,
      disk: 0.4
    }
    setTimeout(() => resolve(mock), 100)
  })
}

function getPreview() {
  return new Promise((resolve, reject) => {
    const mock = {
      web: 0,
      ftp: 0,
      database: 0,
      risk: 3
    }
    setTimeout(() => resolve(mock), 100)
  })
}

function getDevices() {
  return new Promise((resolve, reject) => {
    rpcClient.write({
      sortType: 1,
      filtType: 2
    }, function (err, res) {
      err ? reject(err) : resolve(res.devices);
    })
  });
}

function changeDevice(d) {
  return new Promise((resolve, reject) => {
    rpcClient.write(d, function (err, res) {
      err ? reject(err) : resolve(res.devices);
    })
  });
}

function resolveFile(ctx, next) {
  // 获取上传文件
  const file = ctx.request.files.file;
  // 创建读取流
  const readStream = createReadStream(file.path);
  const filePath = join(__dirname, 'upload') + `/${file.name}`;
  // 创建写入流
  const writeStream = createWriteStream(filePath);
  // 监控流
  const watchStream = progress({
    length: file.size,
    time: 100
  });

  watchStream
    .on('progress', function (progress) {
      console.log('🚗 进度 ', progress);
    })
    .on('error', function (err) {
      console.log('🙅‍♂️ 失败', err);
    })
    .on('end', function () {
      console.log('👌 完成');
    })

  console.log('⏰ 开始写入文件...');
  readStream.pipe(watchStream).pipe(writeStream);  // 读取流 通过管道转发数据到 写入流

  ctx.body = { code: 200, message: 'haha, ok' };
  next();
}


module.exports = { getStatus, getPreview, resolveFile, getDevices, changeDevice }
