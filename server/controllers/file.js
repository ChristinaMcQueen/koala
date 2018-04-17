/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';
import events from 'events';
import shell from 'shelljs';

import makePubSub from './pubSub';

const publicPath = path.resolve(__dirname, 'public');
shell.mkdir('-p', publicPath);

const readSync = (ctx) => {
    const fileList = fs.readdirSync(publicPath);
    const content = [];
    fileList.forEach((fileName) => {
        console.log('in loop:', fileName);
        content.push(fs.readFileSync(path.resolve(publicPath, fileName), 'utf8').replace('\n', ''));
    });
    console.log('done:', content.join(', '));
    ctx.body = { content: content.join(', ') };
};

const readCallback = (ctx) => {
    fs.readdir(publicPath, (err, fileList) => {
        if (err) throw new Error(`Read Dir '${publicPath}' Error`);
        fileList.forEach((fileName) => {
            const filePath = path.resolve(publicPath, fileName);
            fs.readFile(filePath, 'utf8', (error, file) => {
                if (error) throw new Error(`Read File '${filePath}' Error`);
                console.log(file.replace('\n', ''));
            });
        });
    });
    ctx.body = { content: 'callback' };
};

const readEvent = (ctx) => {
    const pubSub = makePubSub();
    fs.readdir(publicPath, (err, fileList) => {
        if (err) throw new Error(`Read Dir '${publicPath}' Error`);
        pubSub.publish('readFile', fileList);
    });
    pubSub.subscribe('readFile', (fileList) => {
        console.log(fileList);
        fileList.forEach((fileName) => {
            const filePath = path.resolve(publicPath, fileName);
            fs.readFile(filePath, 'utf8', (err, file) => {
                if (err) throw new Error(`Read File '${filePath}' Error`);
                console.log(file.replace('\n', ''));
            });
        });
    });
    ctx.body = { content: 'event' };
};

const readPubSub = (ctx) => {
    const emitter = new events.EventEmitter();
    fs.readdir(publicPath, (err, fileList) => {
        if (err) throw new Error(`Read Dir '${publicPath}' Error`);
        console.log(fileList);
        emitter.emit('readFile', fileList);
    });
    emitter.on('readFile', (fileList) => {
        fileList.forEach((fileName) => {
            const filePath = path.resolve(publicPath, fileName);
            fs.readFile(filePath, 'utf8', (err, file) => {
                if (err) throw new Error(`Read File '${filePath}' Error`);
                console.log(file.replace('\n', ''));
            });
        });
    });
    ctx.body = { content: 'Node event' };
};

const readPromise = (ctx) => {
    const getFileList = () => new Promise((resolve, reject) => {
        fs.readdir(publicPath, (err, fileList) => (err ? reject(err) : resolve(fileList)));
    });
    const getFileContent = filePath => new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, content) => (err ? reject(err) : resolve(content.replace('\n', ''))));
    });
    getFileList().then(fileList => Promise.all(fileList.map((fileName) => {
        const filePath = path.resolve(publicPath, fileName);
        return getFileContent(filePath);
    }))).then((result) => {
        console.log(result.join(', '));
    }).catch((err) => {
        throw err;
    });
    ctx.body = { content: 'promise' };
};

const readGenerator = (ctx) => {
    function* ReadFile(fileList) {
        yield fileList.forEach((fileName) => {
            const filePath = path.resolve(publicPath, fileName);
            fs.readFile(filePath, 'utf8', (err, file) => {
                if (err) throw new Error(`Read File '${filePath}' Error`);
                console.log(file.replace('\n', ''));
            });
        });
    }
    function* ReadDir() {
        yield fs.readdir(publicPath, (err, fileList) => {
            if (err) throw new Error(`Read Dir '${publicPath}' Error`);
            console.log(fileList);
            const readFile = ReadFile(fileList);
            readFile.next();
        });
    }
    const readDir = ReadDir();
    readDir.next();
    ctx.body = { content: 'generator' };
};

export default {
    readSync,
    readCallback,
    readEvent,
    readPubSub,
    readPromise,
    readGenerator
};
