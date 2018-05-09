import path from 'path';

import Koa from 'koa';
import middlewares from 'koa-middlewares';
import json from 'koa-json';
import serve from 'koa-static';
import historyApiFallback from 'koa2-history-api-fallback';

import index from './routes/index';
import file from './routes/file';
import modules from './routes/modules';

import startApp from './serverListening';
import crossDomain from './middlewares/crossDomain';
import wrap from './middlewares/wrap';

const app = new Koa();

// middlewares
middlewares.onerror(app);
app.use(middlewares.bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(middlewares.logger());
app.use(json());

app.use(wrap());
app.use(crossDomain);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(file.routes(), file.allowedMethods());
app.use(modules.routes(), modules.allowedMethods());
app.use(historyApiFallback());
app.use(serve(path.resolve('dist')));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

startApp(app);
