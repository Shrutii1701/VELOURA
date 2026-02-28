const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Native Server Healthy on Port 3001\n');
});
server.listen(3001, () => {
    console.log('Native server running at http://localhost:3001/');
});
