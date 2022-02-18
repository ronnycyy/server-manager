const { getStatus, getPreview, resolveFile, getDevices } = require("./controller")


module.exports = function (router) {
  function mountApi(path, cb, method, special = false) {
    if (special) {
      return router.post(path, cb);
    }

    switch (method) {
      case 'GET': {
        router.get(path, async (ctx, next) => {
          ctx.body = await cb(ctx);
          next();
        });
        break;
      }
      case 'POST': {
        router.post(path, async (ctx, next) => {
          ctx.body = await cb();
          next();
        });
        break;
      }
    }
  }

  mountApi('/data/status', getStatus, 'GET');
  mountApi('/data/preview', getPreview, 'GET');
  mountApi('/data/devices', getDevices, 'GET');
  mountApi('/file', resolveFile, 'POST', true);

  return router.routes();
}

