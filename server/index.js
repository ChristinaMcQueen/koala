import http from 'http';
import path from 'path';
import Koa from 'koa';
import json from 'koa-json';
import serve from 'koa-static';
import middlewares from 'koa-middlewares';

import wrap from './middlewares/wrap';
import crossDomain from './middlewares/crossDomain';

const app = new Koa();
const server = http.createServer(app.callback());
const port = process.env.port || process.env.PORT || 8080;

// middlewares
middlewares.onerror(app);
app.use(middlewares.bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(middlewares.logger());
app.use(json());
app.use(wrap());
app.use(crossDomain);

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(index.routes(), index.allowedMethods());
app.use(config.routes(), config.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(coin.routes(), coin.allowedMethods());
app.use(historyApiFallback());
app.use(serve(path.resolve('dist')));
server.listen(port);
