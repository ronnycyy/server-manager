module.exports = app => {
    const os = require('os');
    const router = require('express').Router();
    
    router.get('/os', async (req, res) => {
      const hostname = os.hostname();
      res.send({hostname});
    });

    app.use('/web/api', router);
  }