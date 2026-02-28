const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Native Server Healthy on Port 8080\n');
});
server.listen(8080, () => {
    console.log('Native server running at http://localhost:8080/');
});
