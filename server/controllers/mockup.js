/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';

const readAsync = async (ctx) => {
    // const filePath = path.resolve(process.cwd(), `${ctx.request.url.split('/api/')[1]}.json`);
    // const getFileContent = async filePath => new Promise((resolve, reject) => {
    //     fs.readFile(filePath, 'utf8', (err, content) => (err ? reject(err) : resolve(content.replace('\n', ''))));
    // });
    // const data = await getFileContent(filePath);
    const data = require(path.resolve(process.cwd(), `${ctx.request.url.split('/api/')[1]}.js`));
    ctx.body = { content: data };
};

export default {
    readAsync
};
