'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    var server = _http2.default.createServer(app.callback());
    var port = process.env.port || process.env.PORT || 8988;

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error('Port ' + bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error('Port ' + bind + ' is already in use');
                port += 1;
                server.listen(port);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        console.log('\n\u2744\uFE0F\u2744\uFE0F\u2744\uFE0FListening on ' + bind + ' \u2744\uFE0F\u2744\uFE0F\u2744\uFE0F\n');
    }

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
};
//# sourceMappingURL=serverListening.js.map