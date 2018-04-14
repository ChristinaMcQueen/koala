require('babel-core/register')({
    presets: [
        ['env', {
            targets: {
                node: true
            }
        }]
    ]
});

require('./server/server');
