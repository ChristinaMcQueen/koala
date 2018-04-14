import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

const publicPath = path.resolve(__dirname, 'public');
shell.mkdir('-p', publicPath);

const readDirCallback = (dir) => {
    const readPath = dir || publicPath;
    console.log('======\n', dir);
    fs.readdir(readPath);
};

const write = () => {
};

export default {
    readDirCallback,
    write
};
