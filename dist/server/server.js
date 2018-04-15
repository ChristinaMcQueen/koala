'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaMiddlewares = require('koa-middlewares');

var _koaMiddlewares2 = _interopRequireDefault(_koaMiddlewares);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koa2HistoryApiFallback = require('koa2-history-api-fallback');

var _koa2HistoryApiFallback2 = _interopRequireDefault(_koa2HistoryApiFallback);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _file = require('./routes/file');

var _file2 = _interopRequireDefault(_file);

var _serverListening = require('./serverListening');

var _serverListening2 = _interopRequireDefault(_serverListening);

var _crossDomain = require('./middlewares/crossDomain');

var _crossDomain2 = _interopRequireDefault(_crossDomain);

var _wrap = require('./middlewares/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

// middlewares
_koaMiddlewares2.default.onerror(app);
app.use(_koaMiddlewares2.default.bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(_koaMiddlewares2.default.logger());
app.use((0, _koaJson2.default)());

app.use((0, _wrap2.default)());
app.use(_crossDomain2.default);

// routes
app.use(_index2.default.routes(), _index2.default.allowedMethods());
app.use(_file2.default.routes(), _file2.default.allowedMethods());
app.use((0, _koa2HistoryApiFallback2.default)());
app.use((0, _koaStatic2.default)(_path2.default.resolve('dist')));

// logger
app.use(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        var start, ms;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        start = new Date();
                        _context.next = 3;
                        return next();

                    case 3:
                        ms = new Date() - start;

                        console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

(0, _serverListening2.default)(app);
//# sourceMappingURL=server.js.map