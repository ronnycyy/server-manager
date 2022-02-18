/**
 * 模拟 java 实现的 RPC 服务器
 */

const fs = require('fs')
const protobuf = require('protocol-buffers');
const schemas = protobuf(
  fs.readFileSync(`${__dirname}/device.proto`)
);
const mockData = require('./mock')
const server = require('./manager')(schemas.Request, schemas.Response);

server
  .createServer((request, response) => {
    console.log('接收数据', request);
    response.end({
      devices: mockData
    });
  })
  .listen(4003, () => {
    console.log('rpc server listened: 4003')
  });