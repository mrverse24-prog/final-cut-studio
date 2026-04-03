const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Default to index.html for root
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Check if file exists
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page Not Found</h1>');
            return;
        }

        // Set content type
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        if (ext === '.css') contentType = 'text/css';
        if (ext === '.js') contentType = 'application/javascript';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});
server.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
