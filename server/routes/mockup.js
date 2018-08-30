import mockup from '../controllers/mockup';
// import mockup from '../controllers/file';

const router = require('koa-router')();

router.prefix('/api/mockup');
router.options('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});
router.get('/*', mockup.readAsync);
module.exports = router;
