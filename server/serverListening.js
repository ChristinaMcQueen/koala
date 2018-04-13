import http from 'http';


export default (app) => {
    const server = http.createServer(app.callback());
    let port = process.env.port || process.env.PORT || 8888;

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof port === 'string'
            ? `Pipe ${port}`
            : `Port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`Port ${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port ${bind} is already in use`);
                port += 1;
                server.listen(port);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? `pipe ${addr}`
            : `port ${addr.port}`;
        console.log(`\n❄️❄️❄️Listening on ${bind} ❄️❄️❄️\n`);
    }

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
};
