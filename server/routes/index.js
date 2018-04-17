const router = require('koa-router')();

router.prefix('/api');
router.options('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});

module.exports = router;
