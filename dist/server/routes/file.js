'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _file = require('../controllers/file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('koa-router')();

router.prefix('/api/file');
router.options('/*', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.body = { message: 'success' };

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());
router.get('/read/sync', _file2.default.readSync);
router.get('/read/callback', _file2.default.readCallback);
router.get('/read/event', _file2.default.readEvent);
router.get('/read/pubsub', _file2.default.readPubSub);
router.get('/read/promise', _file2.default.readPromise);
router.get('/read/generator', _file2.default.readGenerator);
module.exports = router;
//# sourceMappingURL=file.js.map