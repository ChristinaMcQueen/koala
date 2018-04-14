import stream from 'stream';

export default debug => async (ctx, next) => {
    try {
        await next();
        const data = ctx.body;
        if (ctx.status >= 400) {
            ctx.throw(ctx.body, ctx.status);
        }
        if ((ctx.method.toLowerCase() !== 'options') && (!(data instanceof stream.Stream))) {
            ctx.body = {
                code: 0,
                data
            };
        }
    }
    catch (e) {
        ctx.status = e.status || e.statusCode || (e.constructor === TypeError ? 400 : 500);
        ctx.body = {
            code: -1,
            message: e.message || e,
            stack: e.stack || e
        };
        if (debug) {
            console.error(e.stack);
        }
        else {
            delete ctx.body.stack;
        }
    }
};
