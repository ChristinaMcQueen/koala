"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var makePubSub = function makePubSub() {
    var callbacks = {};
    var publish = function publish() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var ev = args.shift();
        if (!callbacks[ev]) {
            return this;
        }
        var list = callbacks[ev];
        list.forEach(function (item) {
            item.apply(_this, args);
        });
        return this;
    };
    var subscribe = function subscribe(ev, callback) {
        if (!callbacks[ev]) {
            callbacks[ev] = [];
        }
        callbacks[ev].push(callback);
        return this;
    };
    return { publish: publish, subscribe: subscribe };
};
exports.default = makePubSub;
//# sourceMappingURL=pubSub.js.map