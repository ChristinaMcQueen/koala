import path from 'path';

import Koa from 'koa';
import middlewares from 'koa-middlewares';
import json from 'koa-json';
import serve from 'koa-static';
import historyApiFallback from 'koa2-history-api-fallback';

import index from './routes/index';
// import config from './routes/config';
// import user from './routes/user';
// import coin from './routes/coin';

// import ddAccessToken from './utils/getAccessToken';
// import resetAmount from './utils/resetAmount';
// import updateInfo from './utils/updateInfo';
// import sendReport from './utils/sendReport';

import startApp from './serverListening';
import crossDomain from './middlewares/crossDomain';
import wrap from './middlewares/wrap';

const app = new Koa();
// let token = '';

// function getAccessToken(init) {
//     ddAccessToken(app).then((result) => {
//         token = result;
//         if (init) {
//             // sendReport(result); // TODO delete at 2.8
//             updateInfo(result); // first init organization information
//         }
//     });
// }

// getAccessToken(true);
// setInterval(() => {
//     getAccessToken(false);
// }, 1000 * 60 * 115);

// update amount every month
// schedule.scheduleJob('0 0 1 * *', () => {
//     resetAmount();
// });
// update user information everyday
// schedule.scheduleJob('0 0 * * *', () => {
//     updateInfo(token);
// });
//
// schedule.scheduleJob('0 9 1 * *', () => {
//     sendReport(token);
// });

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
// app.use(config.routes(), config.allowedMethods());
// app.use(user.routes(), user.allowedMethods());
// app.use(coin.routes(), coin.allowedMethods());
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
