import file from '../controllers/file';

const router = require('koa-router')();

router.prefix('/file');
router.options('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});
router.get('/readcallback', file.readDirCallback);
module.exports = router;
