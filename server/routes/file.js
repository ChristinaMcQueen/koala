import file from '../controllers/file';

const router = require('koa-router')();

router.prefix('/api/file');
router.options('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});
router.get('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});
router.get('/readdir', file.readDirCallback);
module.exports = router;
