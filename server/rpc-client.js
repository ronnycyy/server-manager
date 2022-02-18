const EasySock = require('easy_sock');
const protobuf = require('protocol-buffers')
const fs = require('fs');
const schemas = protobuf(fs.readFileSync(`${__dirname}/device.proto`));

// 连接后端的 RPC 服务
const easySock = new EasySock({ 
    ip: '127.0.0.1',
    port: 4003,
    timeout: 500,
    keepAlive: true
})

easySock.encode = function(data, seq) {
    const generateBody = (data) => {
        console.log('socket encode', data);
        let requestSchema = schemas.Request;
        if (data['id']) {
            requestSchema = schemas.Device;
        }
        return requestSchema.encode(data);
    }

    const head = Buffer.alloc(8);
    const body = generateBody(data);

    head.writeInt32BE(seq);
    head.writeInt32BE(body.length, 4);

    return Buffer.concat([head, body])
}

easySock.decode = function(buffer) {
    const seq = buffer.readInt32BE();
    const body = schemas.Response.decode(buffer.slice(8));
    console.log('socket decode',buffer, body);
    
    return {
        result: body,
        seq
    }
}

easySock.isReceiveComplete = function(buffer) {
    if (buffer.length < 8) {
        return 0
    }
    const bodyLength = buffer.readInt32BE(4);

    if (buffer.length >= bodyLength + 8) {
        return bodyLength + 8
        
    } else {
        return 0
    }
}

module.exports = easySock;