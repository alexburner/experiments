'use strict';

let fs = require('fs');
let dir = __dirname.split('/').pop();
let date = new Date().toLocaleString();

function walkDirectory(path='/') {
    fs.readdir(__dirname + path, (err, files) => {
        if (err) return console.error(err);
        writeIndex(path, files);
        files.forEach((file) => {
            fs.stat(__dirname + path + file, (err, stat) => {
                if (err) return console.error(err);
                if (stat && stat.isDirectory()) {
                    walkDirectory(path + file + '/');
                }
            });
        });
    });
}

function writeIndex(path, files) {
    if (files.includes('index.html') && !files.includes('.indexed')) return;
    files = files.filter(file => !file.startsWith('.') && file !== 'index.html');
    files.unshift('../');
    let title = `Index of ${dir + path}`;
    let list = files
        .map(file => `<li><a href="${file}">${file}</a></li>`)
        .join('')
    ;
    let index = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
            <ul>${list}</ul>
            <cite>Generated on ${date}</cite>
        </body>
        </html>
    `;
    fs.writeFile(__dirname + path + 'index.html', index, err => {
        if (err) return console.error(err);
        console.log(`✓ wrote index for ${path}`);
        fs.writeFile(__dirname + path + '.indexed', date, err => {
            if (err) return console.error(err);
            console.log(`✓✓ wrote .indexed for ${path}`);
        });
    });
}

walkDirectory();