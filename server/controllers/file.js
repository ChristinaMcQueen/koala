import fs from 'fs';
import path from 'path';

const publicPath = path.resolve(__dirname, 'public');

const readDirCallback = (dir) => {
    const readPath = dir || publicPath;
    fs.readdir(readPath);
};

const write = () => {
};

export default {
    readDirCallback,
    write
};
