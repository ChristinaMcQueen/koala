import importA from './importA';
// import importB from './importB';

// const commonA = require('./commonA');
// const commonB = require('./commonB');

// const commonjs = async (ctx) => {
//     console.log('在 main.js 之中, a.done=%j, b.done=%j', commonA.done, commonB.done);
//     ctx.body = {
//         content: {
//             a: commonA.done,
//             b: commonB.done
//         }
//     };
// };

const esImport = async (ctx) => {
    console.log('在 main.js 之中', importA());
    ctx.body = {
        content: {
            a: 'a',
            b: 'b'
        }
    };
};

export default {
    // commonjs,
    esImport
};
