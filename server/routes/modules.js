import modules from '../controllers/modules';

const router = require('koa-router')();

router.prefix('/api/module');
router.options('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});
// router.get('/circular/commonjs', modules.commonjs);
// router.get('/circular/import', modules.esImport);
module.exports = router;
