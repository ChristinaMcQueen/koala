const makePubSub = function () {
    const callbacks = {};
    const publish = function (...args) {
        const ev = args.shift();
        if (!callbacks[ev]) {
            return this;
        }
        const list = callbacks[ev];
        list.forEach((item) => {
            item.apply(this, args);
        });
        return this;
    };
    const subscribe = function (ev, callback) {
        if (!callbacks[ev]) {
            callbacks[ev] = [];
        }
        callbacks[ev].push(callback);
        return this;
    };
    return { publish, subscribe };
};
export default makePubSub;
