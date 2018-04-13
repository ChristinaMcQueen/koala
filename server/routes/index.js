const router = require('koa-router')();

router.options('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});

module.exports = router;
