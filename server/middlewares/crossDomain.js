export default async (ctx, next) => {
    await next();
    ctx.set({
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,DELETE',
        'Access-Control-Allow-Origin': ctx.get('origin'),
        'Access-Control-Allow-Headers': 'x-requested-with,accept,Content-Type,Cookie,Set-Cookie,Cookie-Alt,Msid,X-Medishare-city',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Max-Age': 3600
    });
};
