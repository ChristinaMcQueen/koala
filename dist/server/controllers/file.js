'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _pubSub = require('./pubSub');

var _pubSub2 = _interopRequireDefault(_pubSub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicPath = _path2.default.resolve(__dirname, 'public'); /* eslint-disable no-unused-vars */

_shelljs2.default.mkdir('-p', publicPath);

var readSync = function readSync(ctx) {
    // const filePath = publicPath;
    var fileList = _fs2.default.readdirSync(publicPath);
    var content = [];
    fileList.forEach(function (fileName) {
        console.log('in loop:', fileName);
        content.push(_fs2.default.readFileSync(_path2.default.resolve(publicPath, fileName), 'utf8').replace('\n', ''));
    });
    console.log('done:', content.join(', '));
    ctx.body = { content: content.join(', ') };
};

var readCallback = function readCallback(ctx) {
    _fs2.default.readdir(publicPath, function (err, fileList) {
        if (err) throw new Error('Read Dir \'' + publicPath + '\' Error');
        fileList.forEach(function (fileName) {
            var filePath = _path2.default.resolve(publicPath, fileName);
            _fs2.default.readFile(filePath, 'utf8', function (error, file) {
                if (error) throw new Error('Read File \'' + filePath + '\' Error');
                console.log(file.replace('\n', ''));
            });
        });
    });
    ctx.body = { content: 'callback' };
};

var readEvent = function readEvent(ctx) {
    var pubSub = (0, _pubSub2.default)();
    _fs2.default.readdir(publicPath, function (err, fileList) {
        if (err) throw new Error('Read Dir \'' + publicPath + '\' Error');
        pubSub.publish('readFile', fileList);
    });
    pubSub.subscribe('readFile', function (fileList) {
        console.log(fileList);
        fileList.forEach(function (fileName) {
            var filePath = _path2.default.resolve(publicPath, fileName);
            _fs2.default.readFile(filePath, 'utf8', function (error, file) {
                if (error) throw new Error('Read File \'' + filePath + '\' Error');
                console.log(file.replace('\n', ''));
            });
        });
    });
    ctx.body = { content: 'event' };
};

var readPubSub = function readPubSub(ctx) {
    var emitter = new _events2.default.EventEmitter();
    _fs2.default.readdir(publicPath, function (err, fileList) {
        if (err) throw new Error('Read Dir \'' + publicPath + '\' Error');
        console.log(fileList);
        emitter.emit('readFile', fileList);
    });
    emitter.on('readFile', function (fileList) {
        fileList.forEach(function (fileName) {
            var filePath = _path2.default.resolve(publicPath, fileName);
            _fs2.default.readFile(filePath, 'utf8', function (error, file) {
                if (error) throw new Error('Read File \'' + filePath + '\' Error');
                console.log(file.replace('\n', ''));
            });
        });
    });
    ctx.body = { content: 'Node event' };
};

var readPromise = function readPromise(ctx) {
    var getFileList = function getFileList() {
        return new _promise2.default(function (resolve, reject) {
            _fs2.default.readdir(publicPath, function (err, fileList) {
                return err ? reject(err) : resolve(fileList);
            });
        });
    };
    var getFileContent = function getFileContent(filePath) {
        return new _promise2.default(function (resolve, reject) {
            _fs2.default.readFile(filePath, 'utf8', function (err, content) {
                return err ? reject(err) : resolve(content.replace('\n', ''));
            });
        });
    };
    getFileList().then(function (fileList) {
        return _promise2.default.all(fileList.map(function (fileName) {
            var filePath = _path2.default.resolve(publicPath, fileName);
            return getFileContent(filePath);
        }));
    }).then(function (result) {
        console.log(result.join(', '));
    }).catch(function (err) {
        throw err;
    });
    ctx.body = { content: 'promise' };
};

exports.default = {
    readSync: readSync,
    readCallback: readCallback,
    readEvent: readEvent,
    readPubSub: readPubSub,
    readPromise: readPromise
};
//# sourceMappingURL=file.js.map