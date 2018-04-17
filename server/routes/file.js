import file from '../controllers/file';

const router = require('koa-router')();

router.prefix('/api/file');
router.options('/*', async (ctx) => {
    ctx.body = { message: 'success' };
});
router.get('/read/sync', file.readSync);
router.get('/read/callback', file.readCallback);
router.get('/read/event', file.readEvent);
router.get('/read/pubsub', file.readPubSub);
router.get('/read/promise', file.readPromise);
module.exports = router;
