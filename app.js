require('@babel/register')({
    '@babel/preset-env': [
        ['env', {
            node: 'current',
            browsers: [
                '> 1%',
                'ie > 8'
            ]
        }]
    ]
});

require('./server/index');
