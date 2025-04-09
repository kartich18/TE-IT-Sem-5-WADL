const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const port = 1800;
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(..[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);
    const ext = path.parse(pathname).ext;

    if (parsedUrl.pathname === '/') {
        var filesLink = "<ul>";
        res.setHeader('Content-type', 'text/html');
        var filesList = fs.readdirSync("./");
        filesList.forEach(element => {
            if (fs.statSync("./" + element).isFile()) {
                filesLink += `<br/><li><a href='./${element}'> ${element}</a></li>`;
            }
        });
        filesLink += "</ul>";
        res.end("<h1>List of files:</h1> " + filesLink);
        return;
    }

    if (!fs.existsSync(pathname)) {
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
    }

    if (fs.statSync(pathname).isDirectory()) pathname += '/index.html';

    fs.readFile(pathname, function(err, data) {
        if (err) {
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            res.setHeader('Content-type', mimeType[ext] || 'text/plain');
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});