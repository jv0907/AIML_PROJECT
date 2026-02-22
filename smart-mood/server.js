const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;
const baseDir = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(baseDir, urlPath === '/' ? '/index.html' : urlPath);

  // Prevent directory traversal
  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Fallback to index.html for SPA-like routing
      filePath = path.join(baseDir, 'index.html');
    } else if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404);
        return res.end('Not Found');
      }
      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Smart Mood server running at http://localhost:${PORT}/`);
});