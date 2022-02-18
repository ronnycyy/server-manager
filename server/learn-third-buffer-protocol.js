const protobuf = require('protocol-buffers')
const fs = require('fs')
const path = require('path')

// pass a proto file as a buffer/string or pass a parsed protobuf-schema object
const messages = protobuf(fs.readFileSync(path.resolve(__dirname, './protocol-buffer/test.proto')))

let buf;
console.log(buf = messages.Test.encode({ num: 42, payload: 'hello world' }));
console.log(messages.Test.decode(buf));
